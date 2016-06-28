const PORT = 3000;

var http = require("http");
var socketio = require("socket.io");
var mongoose = require("mongoose");
var Models = require("./database/Models.js")(mongoose);
var Operations = require("./database/Operations.js");
var fs = require("fs");

var server = http.createServer(function (request, response) {
    if (request.method == "GET") {
        console.log(request.method + ": " + request.url);

        switch (request.url) {
            case "/":
                fs.readFile("./static/index.html", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(data);
                    response.end();
                });
                break;

            default:
                fs.readFile("./static" + request.url, function (error, data) {
                    if (error) {
                        response.writeHead(404, { 'Content-Type': 'text/plain' });
                        response.end("Not found #404");
                        return false;
                    }

                    response.writeHead(200, { 'Content-Type': getContentType(request.url) });
                    response.write(data);
                    response.end();
                });
        }
    }
}).listen(PORT);

/* v - MEMO - v */

var firstPlayer = {
    isset: false,
    nickname: null,
    score: 0,
    sid: null
};

var secondPlayer = {
    isset: false,
    nickname: null,
    score: 0,
    sid: null
};

var turn = null;
var queue = [];
var won = false;

/* ^ - MEMO - ^ */

var io = socketio.listen(server);

mongoose.connect('mongodb://localhost/memo');

var db = mongoose.connection;
var ops = new Operations();

db.on("error", function () {
    console.log("MongoDB ERROR");
});

db.once("open", function () {
    console.log("MongoDB CONNECTED");

    ops.logoutAll(Models.User);

    /*SOCKET - v - MONGO*/

    io.sockets.on("connection", function (client) {
        console.log("USER CONNECTED. Client ID: " + client.id);

        /* v - SOCKET - v */

        (function tipLoop() {
            if (firstPlayer.isset && !secondPlayer.isset)
                io.sockets.to(firstPlayer.sid).emit("tip_waiting");

            setTimeout(tipLoop, 6000);
        })();

        client.on("login", function (nickname, password) {
            ops.login(Models.User, nickname, password, client.id, function (valid) {
                io.sockets.to(client.id).emit("logged", valid);

                if (!valid) return;

                if (!firstPlayer.isset) {
                    firstPlayer.isset = true;
                    firstPlayer.nickname = nickname;
                    firstPlayer.sid = client.id;
                }
                else if (!secondPlayer.isset) {
                    secondPlayer.isset = true;
                    secondPlayer.nickname = nickname;
                    secondPlayer.sid = client.id;

                    startGame(randomBoard());
                }
                else {
                    queue.push({
                        nickname: nickname,
                        sid: client.id
                    });
                }

                var queueStrings = [];

                for (var i in queue)
                    queueStrings.push(queue[i].nickname);

                client.broadcast.emit("player_join", nickname);
                io.sockets.emit("update_players", firstPlayer, secondPlayer, queueStrings);
            });
        });

        client.on("register", function (nickname, password) {
            ops.register(Models.User, nickname, password, function (valid) {
                io.sockets.to(client.id).emit("registered", valid);
            });
        });

        client.on("get_ranking", function () {
            ops.getRanking(Models.User, function (users) {
                io.sockets.to(client.id).emit("make_ranking", users);
            });
        });

        var timerOneCountdown = false;
        var timeoutOne;

        client.on("timer1_start", function () {
            if (timerOneCountdown) return;

            timerOneCountdown = true;
            var time = 0;
            var maxTime = 15;

            (function timeLoop() {
                if (timerOneCountdown) {
                    time += 0.05

                    if (time > maxTime)
                        time = maxTime;

                    io.sockets.emit("timer1_update", time);
                }

                if (time >= maxTime) {
                    io.sockets.emit("timer1_end");
                    ///
                    turn = secondPlayer;
                    io.sockets.to(secondPlayer.sid).emit("you_turn", 2);
                    io.sockets.to(firstPlayer.sid).emit("not_you_turn");
                    io.sockets.to(firstPlayer.sid).emit("lose_turn");
                }
                else
                    timeoutOne = setTimeout(timeLoop, 50);
            })();
        });

        client.on("timer1_stop", function () {
            timerOneCountdown = false;
        });

        client.on("timer1_continue", function () {
            timerOneCountdown = true;
        });

        client.on("timer1_reset", function () {
            timerOneCountdown = false;
            clearTimeout(timeoutOne);
            io.sockets.emit("timer1_update", 0);
        });

        var timerTwoCountdown = false;
        var timeoutTwo;

        client.on("timer2_start", function () {
            if (timerTwoCountdown) return;

            timerTwoCountdown = true;
            var time = 0;
            var maxTime = 15;

            (function timeLoop() {
                if (timerTwoCountdown) {
                    time += 0.05

                    if (time > maxTime)
                        time = maxTime;

                    io.sockets.emit("timer2_update", time);
                }

                if (time >= maxTime) {
                    io.sockets.emit("timer2_end");
                    ///
                    turn = firstPlayer;
                    io.sockets.to(firstPlayer.sid).emit("you_turn", 1);
                    io.sockets.to(secondPlayer.sid).emit("not_you_turn");
                    io.sockets.to(secondPlayer.sid).emit("lose_turn");
                }
                else
                    timeoutTwo = setTimeout(timeLoop, 50);
            })();
        });

        client.on("timer2_stop", function () {
            timerTwoCountdown = false;
        });

        client.on("timer2_continue", function () {
            timerTwoCountdown = true;
        });

        client.on("timer2_reset", function () {
            timerTwoCountdown = false;
            clearTimeout(timeoutTwo);
            io.sockets.emit("timer2_update", 0);
        });

        client.on("first_player_response", function (playagain) {
            if (playagain) {
                firstPlayer.score = 0;
                secondPlayer.score = 0;

                if (queue.length > 0) {
                    secondPlayer = queue.splice(0, 1)[0];
                    secondPlayer.isset = true;
                    secondPlayer.score = 0;
                }
            }
            else {
                if (queue.length > 1) {
                    queue.push({
                        nickname: firstPlayer.nickname,
                        sid: firstPlayer.sid
                    });

                    firstPlayer = queue.splice(0, 1)[0];
                    firstPlayer.isset = true;
                    firstPlayer.score = 0;

                    secondPlayer = queue.splice(0, 1)[0];
                    secondPlayer.isset = true;
                    secondPlayer.score = 0;
                }
                else
                    io.sockets.to(client.id).emit("exit");
            }

            var queueStrings = [];

            for (var i in queue)
                queueStrings.push(queue[i].nickname);

            io.sockets.emit("update_players", firstPlayer, secondPlayer, queueStrings);
        });

        client.on("second_player_response", function (playagain) {
            if (playagain) {
                firstPlayer = secondPlayer;
                firstPlayer.score = 0;

                secondPlayer = {
                    isset: false,
                    nickname: null,
                    score: 0,
                    sid: null
                };

                if (queue.length > 0) {
                    secondPlayer = queue.splice(0, 1)[0];
                    secondPlayer.isset = true;
                    secondPlayer.score = 0;
                }
            }
            else {
                if (queue.length > 1) {
                    queue.push({
                        nickname: secondPlayer.nickname,
                        sid: secondPlayer.sid
                    });

                    firstPlayer = queue.splice(0, 1)[0];
                    firstPlayer.isset = true;
                    firstPlayer.score = 0;

                    secondPlayer = queue.splice(0, 1)[0];
                    secondPlayer.isset = true;
                    secondPlayer.score = 0;
                }
                else
                    io.sockets.to(client.id).emit("exit");
            }

            var queueStrings = [];

            for (var i in queue)
                queueStrings.push(queue[i].nickname);

            io.sockets.emit("update_players", firstPlayer, secondPlayer, queueStrings);
        });

        client.on("get_info_bar", function () {
            ops.getRanking(Models.User, function (users) {
                if (firstPlayer.isset && secondPlayer.isset) {
                    var oneRanking = 0;

                    for (var i in users)
                        if (users[i].nickname == firstPlayer.nickname)
                            oneRanking = parseInt(i) + 1;

                    var playerOne = {
                        nickname: firstPlayer.nickname,
                        score: firstPlayer.score,
                        ranking: oneRanking,
                    }

                    var twoRanking = 0;

                    for (var i in users)
                        if (users[i].nickname == secondPlayer.nickname)
                            twoRanking = parseInt(i) + 1;

                    var playerTwo = {
                        nickname: secondPlayer.nickname,
                        score: secondPlayer.score,
                        ranking: twoRanking,
                    }

                    io.sockets.emit("update_info_bar", playerOne, playerTwo);
                } else if (firstPlayer.isset) {
                    var oneRanking = 0;

                    for (var i in users)
                        if (users[i].nickname == firstPlayer.nickname)
                            oneRanking = parseInt(i) + 1;

                    var playerOne = {
                        nickname: firstPlayer.nickname,
                        score: firstPlayer.score,
                        ranking: oneRanking,
                    }

                    io.sockets.emit("update_info_bar", playerOne, null);
                } else if (secondPlayer.isset) {
                    var twoRanking = 0;

                    for (var i in users)
                        if (users[i].nickname == secondPlayer.nickname)
                            twoRanking = parseInt(i) + 1;
                    var playerTwo = {
                        nickname: secondPlayer.nickname,
                        score: secondPlayer.score,
                        ranking: twoRanking,
                    }

                    io.sockets.emit("update_info_bar", null, playerTwo);
                }
            });
        });

        function startGame(board) {
            io.sockets.emit("start_game", board);

            setTimeout(function () {
                won = false;
                turn = firstPlayer;
                io.sockets.to(firstPlayer.sid).emit("you_turn", 1);
                io.sockets.to(secondPlayer.sid).emit("not_you_turn");

                incPlayed();
            }, 5000);
        }

        function incPlayed() {
            ops.incPlayed(Models.User, firstPlayer.nickname);
            ops.incPlayed(Models.User, secondPlayer.nickname);
        }

        client.on("keep_playing", function () {
            if (turn == firstPlayer) {
                firstPlayer.score++;
                io.sockets.to(firstPlayer.sid).emit("you_turn", 1);
                io.sockets.to(secondPlayer.sid).emit("not_you_turn");
            }
            else if (turn == secondPlayer) {
                secondPlayer.score++;
                io.sockets.to(secondPlayer.sid).emit("you_turn", 1);
                io.sockets.to(firstPlayer.sid).emit("not_you_turn");
            }
        });

        client.on("switch_turn", function () {
            if (turn == firstPlayer) {
                turn = secondPlayer;
                io.sockets.to(secondPlayer.sid).emit("you_turn", 2);
                io.sockets.to(firstPlayer.sid).emit("not_you_turn");

                timerOneCountdown = false;
                clearTimeout(timeoutOne);
                io.sockets.emit("timer1_update", 0);
            }
            else if (turn == secondPlayer) {
                turn = firstPlayer;
                io.sockets.to(firstPlayer.sid).emit("you_turn", 1);
                io.sockets.to(secondPlayer.sid).emit("not_you_turn");

                timerTwoCountdown = false;
                clearTimeout(timeoutTwo);
                io.sockets.emit("timer2_update", 0);
            }
        });

        client.on("click", function (name) {
            client.broadcast.emit("discover", name);
        });

        client.on("success_exposure", function (name1, name2) {
            client.broadcast.emit("success_exposure", name1, name2);
        });

        client.on("fail_exposure", function (name1, name2) {
            client.broadcast.emit("fail_exposure", name1, name2);
        });

        client.on("iwon", function () {
            if (won) return;

            won = true;

            if (firstPlayer.score > secondPlayer.score) {
                io.sockets.to(firstPlayer.sid).emit("first_player_won");
                io.sockets.to(secondPlayer.sid).emit("second_player_lost");

                ops.incWon(Models.User, firstPlayer.nickname);
            }
            else {
                io.sockets.to(secondPlayer.sid).emit("second_player_won");
                io.sockets.to(firstPlayer.sid).emit("first_player_lost");

                queue.push(firstPlayer);

                firstPlayer = secondPlayer;

                secondPlayer = {
                    isset: false,
                    nickname: null,
                    score: 0,
                    sid: null
                };

                ops.incWon(Models.User, secondPlayer.nickname);
            }
        });

        client.on("lose_turn2", function (name) {
            client.broadcast.emit("lose_turn2", name);
        });

        /* ^ - SOCKET - ^ */

        client.on("disconnect", function () {
            console.log("USER DISCONNECTED. Client ID: " + client.id);
            ops.logout(Models.User, client.id);

            if (client.id == firstPlayer.sid) {
                io.sockets.emit("player_left", firstPlayer.nickname);

                firstPlayer = {
                    isset: false,
                    nickname: null,
                    score: 0,
                    sid: null
                };

                if (secondPlayer.isset) {
                    io.sockets.to(secondPlayer.sid).emit("second_player_won");
                    ops.incWon(Models.User, secondPlayer.nickname);
                }
            }
            else if (client.id == secondPlayer.sid) {
                io.sockets.emit("player_left", secondPlayer.nickname);

                secondPlayer = {
                    isset: false,
                    nickname: null,
                    score: 0,
                    sid: null
                };

                if (firstPlayer.isset) {
                    io.sockets.to(firstPlayer.sid).emit("first_player_won");
                    ops.incWon(Models.User, firstPlayer.nickname);
                }
                else {
                    if (queue.length > 1) {
                        firstPlayer = queue.splice(0, 1)[0];
                        firstPlayer.isset = true;
                        firstPlayer.score = 0;

                        secondPlayer = queue.splice(0, 1)[0];
                        secondPlayer.isset = true;
                        secondPlayer.score = 0;
                    }
                    else if (queue.length == 1) {
                        firstPlayer = queue.splice(0, 1)[0];
                        firstPlayer.isset = true;
                        firstPlayer.score = 0;
                    }
                }
            }
            else {
                for (var i in queue) {
                    if (client.id == queue[i].sid)
                        io.sockets.emit("player_left", queue.splice(i, 1)[0].nickname); 
                }
            }

            var queueStrings = [];

            for (var i in queue)
                queueStrings.push(queue[i].nickname);

            io.sockets.emit("update_players", firstPlayer, secondPlayer, queueStrings);
        });
    });

    /*SOCKET - ^ - MONGO*/

});

db.once("close", function () {
    console.log("MongoDB DISCONNECTED");
});

function getContentType(fileName) {
    var extension = fileName.split(".").pop();

    switch (extension) {
        case "html": return "text/html";
        case "css": return "text/css";
        case "js": return "application/javascript";
        case "ico": return "image/x-icon";
        default: return "text/plain";
    }
}

function randomBoard() {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    return numbers;
    var random = [];

    do {
        var i = Math.floor(Math.random() * numbers.length);

        random.push(numbers.splice(i, 1)[0]);
    } while (numbers.length > 0);

    return random;
}