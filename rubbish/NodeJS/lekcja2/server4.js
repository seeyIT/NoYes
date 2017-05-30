const PORT = 3000;
var http = require("http");

var qs = require("querystring");
var fs = require("fs");

var server = http.createServer(function (req, res) {
   
    console.log(req.method)
    switch (req.method)
    {
        case "GET":
            fs.readFile("index4.html", function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                    res.end();
                }

                else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                }
            });
            break;
        case "POST":
             servResp(req, res);
            
            break;
    }

   
    function servResp()
    {
        var allData = "";
        req.on("data", function (data) {
           // console.log("data: " + data)
            allData += data;
        })

        //kiedy przyjdą już wszystkie dane
        //parsujemy je do obiektu
        //i odsyłamy do przeglądarki

        req.on("end", function (data) {
            var finish = qs.parse(allData)
            console.log(finish)
            res.end(JSON.stringify(finish));
        })
    }

    

})


server.listen(PORT);

