const PORT = 3000;
var http = require("http");


var qs = require("querystring");
var fs  = require("fs");

var usersTab = [];
var board;
move = false;

var server = http.createServer(function (req, res) {
    if (req.method == "GET")
    {
        LadowanieStron();
        MakeBoard();
    }
    function LadowanieStron()
    {
        
        if (req.url === "/") {
            fs.readFile("static/index.html", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/Game.js") {
            fs.readFile("static/Game.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/three.js") {
            fs.readFile("static/three.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/jquery-2.2.0.min.js") {
            fs.readFile("static/jquery-2.2.0.min.js", function (error, data) {
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
        else if (req.url === "/materials/mat1.png") {
            fs.readFile("static/materials/mat1.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/materials/mat2.png") {
            fs.readFile("static/materials/mat2.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/materials/mat3.png") {
            fs.readFile("static/materials/mat3.png", function (error, data) {
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

    var allData;
    function servResp() {
        allData = "";
        req.on("data", function (data) {            
            allData += data;
             dane = qs.parse(allData)
           
             if (dane.akcja == "add")
                 Logowanie();
             else if (dane.akcja == "reset")
                 Reset();
             else if (dane.akcja == "update")
                 Update();
             else if (dane.akcja == "check")
                 JestDwoch();
             else if (dane.akcja == "checkMove")
                 CzyjRuch();
             else if (dane.akcja == "TakeBoard")
                 Tablica();
        });
               
     
    }

    function Logowanie()
    {
        if (usersTab.length >= 2)
            return;

        var finish = qs.parse(allData)
        

        
        usersTab.push(finish.user);
        

        if (usersTab.length == 1)
        {
            req.on("end", function (data) {
                //res.end("pierwszy");
               
                var foo = [];
                foo.push(1);
                foo.push(board);
                var a = JSON.stringify(foo);
                res.end(a);
            })


        }
        else if (usersTab.length == 2)
        {
            req.on("end", function (data) {
                //res.end("pierwszy");
                var foo = [];
                foo.push(2);
                foo.push(board);
                var a = JSON.stringify(foo);
                res.end(a);
            })
        }
        else {
            req.on("end", function (data) {
                res.end("brakmiejsc");
            })
        }
        
        
        

    }
        

    function Reset()
    {
        usersTab = [];
    }
   
    function Update()
    {
       // move = !move;
        var finish = qs.parse(allData);
        board = JSON.parse(finish.tabela)
        console.log(move);
    }

   
    function CzyjRuch()
    {
        req.on("end", function (data) {
            var foo = [];
            foo.push(move);
            
            var a = JSON.stringify(foo);
            res.end(a);
        })
    }

    function Tablica()
    {
        req.on("end", function (data) {
            var a = JSON.stringify(board);

            res.end(a);
        })
    }


    function JestDwoch()
    {
        if(usersTab.length==2)
        {
            req.on("end", function (data) {
                var a = JSON.stringify("GOGOGO");
                
                res.end(a);
            })
        }
        else
        {
            req.on("end", function (data) {
                var a = JSON.stringify("NOPE");
                res.end(a);
            })
        }
    }
})



server.listen(PORT);




function MakeBoard()
{
    

    board = [
        [1,0,1,0,1,0,1,0],
        [0,1,0,0,0,1,0,1],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,0],
        [2,0,2,0,2,0,2,0],
        [0,2,0,2,0,2,0,2]
    ]
}
