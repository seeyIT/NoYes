const PORT = 3000;
var http = require("http");


var qs = require("querystring");
var fs  = require("fs");
var socketio = require("socket.io");


var server = http.createServer(function (request, response) {
    console.log(request.method);

    if (request.method == "GET") {
        

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





var io = socketio.listen(server);

io.on('connection', function (client) {
    client.on("flying", function (data) {
        //console.log(data)
        //io.sockets.emit("mouseposition", { posX: data.posX, posY: data.posY });
        client.broadcast.emit("flying", { data: data });
        console.log(data.position);
        console.log(data.uuid);
    });

   
});





