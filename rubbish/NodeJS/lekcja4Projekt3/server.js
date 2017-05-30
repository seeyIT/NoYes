const PORT = 3000;
var http = require("http");


var qs = require("querystring");
var fs  = require("fs");
var socketio = require("socket.io");


var server = http.createServer(function (req, res) {
    if (req.method == "GET")
    {
        LoadPages();
    }
    function LoadPages()
    {
        console.log(req.url)
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


    console.log(1);
    io.sockets.on("connection", function (client) {
        console.log("klient sie podłączył" + client.id)
        // client.id - unikalna nazwa klienta generowana przez socket.io

    })
})


server.listen(PORT);

var io = socketio.listen(server);


