/**
 * 1.生成证书服务器的私钥
 * genrsa -out ./server/ca.key 1024
 * 2.生成证书服务器的csr （请求生成证书）
 * 附带上openssl.cnf的配置路径，如果在默认的路径下面赵存不到的情况
 * openssl req -config "D:/Program Files (x86)/SmartGit/git/ssl/openssl.cnf" -new -key ./ca/ca.key -out ./ca/ca.csr
 * 3.自签署证书 ：
 * openssl x509 -req -in c:/ca/ca-req.csr -out c:/ca/ca-cert.pem -signkey c:/ca/ca-key.pem -days 3650
 * openssl x509 -req -in ./ca/ca.csr -out ./ca/ca-cert.pem -signkey ./ca/ca.key -days 3650
 * @type {exports}
 * ca认证机构将证书颁发给服务器,服务器证书在客户端请求的过程当中会发给客户端，客户端通过ca验证真假
 */
var tls = require('tls');
var fs = require('fs');
// genrsa -out ./ca/ca.key 1024
var options = {

    key: fs.readFileSync('./server/server.key'),//服务器的私钥
    cert: fs.readFileSync('./server/server.crt'),//服务器的证书
    requestCert: false,
    ca: fs.readFileSync('./ca/ca.crt')//证书的合法办法结构
};
var server = tls.createServer(options, function (socket) {
    socket.write('hello');
    socket.setEncoding('utf8');
    socket.pipe(socket);
});


server.listen(8080);