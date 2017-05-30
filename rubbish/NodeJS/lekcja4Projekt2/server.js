const PORT = 3000;
var http = require("http");


var qs = require("querystring");
var fs  = require("fs");



var server = http.createServer(function (req, res) {
    if (req.method == "GET")
    {
        LadowanieStron();
    }
    function LadowanieStron()
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
        else if (req.url === "/mp3/DM.mp3") {
            fs.readFile("static/mp3/DM.mp3", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'audio/mpeg' });
                res.write(data);
                res.end();
            })
        }
         else if (req.url === "/static/mp3/dr/cover.png") {
             fs.readFile("static/mp3/dr/cover.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }
         else if (req.url === "/static/mp3/em/cover.png") {
             fs.readFile("static/mp3/em/cover.png", function (error, data) {
                 res.writeHead(200, { 'Content-Type': 'image/png' });
                 res.write(data);
                 res.end();
             })
         }
        else if (req.url.indexOf(".mp3") != -1) {
            req.url.replace(/%20/g, " ");
            var path = __dirname +req.url;
            var filestream = fs.createReadStream(path);
            filestream.on("open", function () {
                var stats = fs.statSync(path);
               
                res.writeHead(200, {
                    'Content-Type': 'audio/mpeg',
                    'Content-Length': stats.size
                });
                filestream.pipe(res);
            });
            filestream.on('error', function (err) {
                // filestream.end();
                console.log(err)
            });

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
           
             if (dane.akcja == "first")
                 Start();
             
             else if (dane.akcja == "next")
                 Next(dane.album);
                 
            
        });
               
     
    }
    function Start()
    {
        var send = [];
        var firstCat;
        var first = true;
        fs.readdir(__dirname+"\\static\\mp3", function (err, files) {
            
            if (err) {
                return console.log(err);
            }
            var dirs = [];
            files.forEach(function (file) {
                if (first)
                    firstCat = file;
                first = false;
                dirs.push(file);
            });
           
            send.push(dirs)

            getFiles();
        });
        function getFiles()
        {
            fs.readdir(__dirname + "\\static\\mp3\\" + firstCat, function (err, files) {

                if (err) {
                    return console.log(err);
                }

                var filesTab = [];
                files.forEach(function (file) {
                    //console.log(file)
                    //var stats = fs.statSync(__dirname + "\\static\\mp3" + "\\dr"); //+ file);
                    // console.log(stats)
                    if(file.indexOf(".mp3")!=-1)
                        filesTab.push(file);
                });
                send.push(filesTab);
                res.end(JSON.stringify(send, null, 4));
            });
        }
        
    }
    
    function Next(name)
    {
        console.log(1)
        console.log(name)
        var send = [];
        fs.readdir(__dirname + "\\static\\mp3\\" + name, function (err, files) {
            console.log(2)
            if (err) {
                return console.log(err);
            }

            var filesTab = [];
            files.forEach(function (file) {
                //console.log(file)
                //var stats = fs.statSync(__dirname + "\\static\\mp3" + "\\dr"); //+ file);
                // console.log(stats)
                if (file.indexOf(".mp3") != -1)
                    filesTab.push(file);
            });
            send.push(filesTab);
            res.end(JSON.stringify(send, null, 4));
        });
    }

})


server.listen(PORT);



