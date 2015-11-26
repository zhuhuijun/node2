/***
 * 1.客户端的私钥
 * genrsa -out ./client/client.key 1024
 * 2.
 * req -config "D:/Program Files (x86)/SmartGit/git/ssl/openssl.cnf" -new -key ./client/client.key -out ./client/client.csr
 * 3.自签署证书 ：
 * x509 -req -in ./client/client.csr -out ./client/client.crt -signkey ./client/client.key -days 3650
 * @type {exports}
 */
var tls = require('tls');
var fs = require('fs');
var options = {
    requestCert: true,
    key: fs.readFileSync('./server/server.key'),//服务器的私钥
    cert: fs.readFileSync('./server/server.crt'),//服务器的证书
    ca: fs.readFileSync('./ca/ca.crt')//证书的合法办法结构
};
var server = tls.createServer(options, function (socket) {
    socket.write('hello');
    socket.setEncoding('utf8');
    socket.pipe(socket);
});
