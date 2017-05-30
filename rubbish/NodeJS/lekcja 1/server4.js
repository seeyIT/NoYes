const PORT = 3000;
var http = require("http");
require("colors");
var server = http.createServer(function (req, res) {
    var letter = req.url.substring(1, req.url.length);
    console.log(letter);
    if (letter == "A")
        console.log("tekst na czerwono".red)
    else if (letter == "B")
        console.log("tekst na czerwono".green)
    else if (letter == "C")
        console.log("tekst na czerwono".rainbow)
    
})


server.listen(PORT);

