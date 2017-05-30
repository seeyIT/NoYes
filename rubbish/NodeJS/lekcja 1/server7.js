﻿const PORT = 3000;
var http = require("http");

require('colors');
require('tracer');

var fs = require("fs");

var server = http.createServer(function (req, res) {
    if(req.url ==="/index.html")
    {
        fs.readFile("static/index.html", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        })
    }
    else if(req.url ==="/second.html")
    {

        fs.readFile("static/second.html", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        })
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write("<h1>404 - brak takiej strony</h1>");
        res.end();

    }
})


server.listen(PORT);





