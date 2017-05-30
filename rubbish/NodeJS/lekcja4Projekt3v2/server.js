const PORT = 3000;
var http = require("http");


var qs = require("querystring");
var fs  = require("fs");
var socketio = require("socket.io");

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/bob');
var Models = require("./database/Models.js")(mongoose);
var Operations = require("./database/Operations.js");
var db;
var opers = new Operations();


var server = http.createServer(function (req, res) {
    if (req.method == "GET")
    {
        LoadPages();
    }
    function LoadPages()
    {
        if (req.url === "/") {
            fs.readFile("static/index.html", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/libs/three.js") {
            fs.readFile("static/libs/three.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            });
        }
        else if (req.url === "/libs/jquery-2.2.0.min.js") {
            fs.readFile("static/libs/jquery-2.2.0.min.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/Net.js") {
            fs.readFile("static/Net.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/UI.js") {
            fs.readFile("static/UI.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/Main.js") {
            fs.readFile("static/Main.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/Intro.js") {
            fs.readFile("static/Intro.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/Field.js") {
            fs.readFile("static/Field.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        } else if (req.url === "/arial.js") {
            fs.readFile("static/arial.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        } else if (req.url === "/Brick.js") {
            fs.readFile("static/Brick.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        } else if (req.url === "/socketio.js") {
            fs.readFile("static/socketio.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/png/mat1.png") {
            fs.readFile("static/png/mat1.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/png/mat2.png") {
            fs.readFile("static/png/mat2.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/png/mat3.png") {
            fs.readFile("static/png/mat3.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }
       
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write("<h1>404 - brak takiej strony</h1>");
            res.end();

        }

    }
   
    if (req.method == "POST")
        servResp(req, res);

    var allData="";
    function servResp() {
        allData = "";
        req.on("data", function (data) {            
            allData += data;
             dane = qs.parse(allData)
           
             
                 
            
        });
               
     
    }


})


connectToMongo();


var io = socketio.listen(server);

io.on('connection', function (client) {
    client.on("buildBrick", function (data) {
        //console.log(data)
        //io.sockets.emit("mouseposition", { posX: data.posX, posY: data.posY });
        client.broadcast.emit("buildBrick", { position: data });

    });

    client.on("addBrick", function (data) {
        //io.sockets.emit("mouseposition", { posX: data.posX, posY: data.posY });
        client.broadcast.emit("addBrick", { uuidTable: data.uuid, positionTable: data.pos });

    });

    client.on("colorBrick",function(data) {
        
        client.broadcast.emit("colorBrick",{uuidTable:data.uuid, color:data.color})
    })


    client.on("loginNormal", function (e) {
        //console.log("emit to " + client.id)
        //  odesłanie  
        opers.SelectByImie(Models.Brick,e.login , function (data) {
            io.sockets.to(client.id).emit("loginNormal", {
                status: data
            });
           
        })
    
    });
    client.on("loginAdmin",
        function(e) {
            
            opers.SelectAll(Models.Brick,
                function(data) {
                    io.sockets.to(client.id)
                        .emit("loginAdmin",
                        {
                            status: data
                        });

                })
        })
    client.on("save", function (data) {
        //  odesłanie  
        console.log(data)
        var brick = new Models.Brick(
                {
                    name: data.name.toString(),
                    user: data.user.toString(),
                    positionX: parseInt(data.positionX),
                    positionY: parseInt(data.positionY),
                    positionZ: parseInt(data.positionZ),
                    color: data.color

                });
        brick.validate(function (err) {
            console.log(err);
        });
        opers.InsertOne(brick);


    });

});


server.listen(PORT);

function connectToMongo() {
    
    db = mongoose.connection;

    //przy wystąpieniu błędu

    db.on("error", function () {
        console.log("problem z mongo")
    });

    //przy poprawnym połaczeniu z bazą

    db.once("open", function () {
        console.log("mongo jest podłączone - można wykonywać operacje na bazie");

        var brick = new Models.Brick(
                {
                    name:		"Jana",
                    user:	"Kowalski",
                    positionX: 10,
                    positionY: 10,
                    positionZ: 10,
                   color: "0xff00ff"

                });

        /*
        imie: { type: String, required: true },
            user: { type: String, required: true },
            positionX: { type: Number, required: true },
            positionY: { type: Number, required: true },
            positionZ: { type: Number, required: true },
            color:
            */
        brick.validate(function (err) {
            //console.log(err);
        });

        //opers.InsertOne(brick);
        //opers.SelectAndLimit(Models.Brick, 3, function (data) {
        //    //console.log(data)
        //})
    });

    //przy rozłaczeniu z bazą

    db.once("close", function () {
        console.log("mongodb zostało odłączone");
    });
}



