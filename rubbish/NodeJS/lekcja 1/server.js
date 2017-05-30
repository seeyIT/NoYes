const PORT = 3000;
var http = require("http");
var server = http.createServer(function (req, res) {
   console.log(1)
})


server.listen(PORT);

