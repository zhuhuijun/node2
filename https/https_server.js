var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('./server/server.key'),//服务器的私钥
    cert: fs.readFileSync('./server/server.crt')//服务器的证书
};
https.createServer(options,function (req, res) {
    res.end('hello');
}).listen(8080);