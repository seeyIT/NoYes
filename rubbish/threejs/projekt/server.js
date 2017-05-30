const PORT = 3000;

var http = require("http");
var mongoose = require("mongoose");
var Models = require("./database/Models.js")(mongoose);
var Operations = require("./database/Operations.js");
var fs = require("fs");
var socketio = require("socket.io");

var server = http.createServer(function (request, response) {
    //console.log(request.method);

    if (request.method == "GET") {
        //console.log(request.url);

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

var io = socketio.listen(server);

io.on('connection', function (client) {
    client.on("getDirectories", function () {

        var _dirs = [];
        fs.readdir(__dirname + "\\models", function (err, files) {
            //console.log(__dirname + "\\models");
            //console.log(files);
            if (err) {
                return console.log(err);
            }

            files.forEach(function (file) {
                _dirs.push(file);
            });

            io.sockets.to(client.id).emit("getDirectories", {
                directories: JSON.stringify(_dirs)
            });
        });
        
    });

    

});



/*


mongoose.connect('mongodb://localhost/test3ib1');

var db;
var ops = new Operations();

function connectToMongo() {

    db = mongoose.connection;

    //przy wystąpieniu błędu

    db.on("error", function () {
        console.log("problem z mongo")
    });

    //przy poprawnym połaczeniu z bazą

    db.once("open", function () {
        console.log("mongo jest podłączone - można wykonywać operacje na bazie");

        var start = Date.now();

        for (var i = 0; i < 1000000; i++) {
            var podatnik = new Models.Podatnik(
            {
                imie: "Jan",
                nazwisko: "Kowalski",
                podatek: 200,
                alive: true,
                age: 20

            });

            //podatnik.validate(function (err) {
            //     console.log(err);
            //});

            ops.InsertOne(podatnik);
        }

        console.log(Date.now() - start);
    });

    //przy rozłaczeniu z bazą

    db.once("close", function () {
        console.log("mongodb zostało odłączone");
    });
}

connectToMongo();

//function post(request, response) {
//    var dataStr = "",
//        dataObj = {},
//        responseObj;

//    request.on("data", function (data) {
//        dataStr += data;
//    });

//    request.on("end", function (data) {
//        dataObj = qs.parse(dataStr);
//    });
//}


*/

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