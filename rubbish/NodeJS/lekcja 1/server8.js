const PORT = 3000;
var http = require("http");

require('colors');
require('tracer');



var server = http.createServer(function (req, res) {
    var logger = require('tracer').colorConsole();
    logger.log('hello');
    logger.trace('hello');
    logger.debug('hello');
    logger.info('hello');
    logger.warn('hello');
    logger.error('hello');
})


server.listen(PORT);





