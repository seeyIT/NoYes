const PORT = 4000;
var http = require("http");
var server = http.createServer(function (req, res) {
    console.log(req.url);
    console.log(req.rawHeaders);
    res.writeHead(200, { "content-type": "audio/mpeg;charset=utf-8" });
    res.end("<marquee>startujemty</marquee>")
})


server.listen(PORT);

console.log(2);