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
    rejectUnauthorized: true,
    key: fs.readFileSync('./client/client.key'),//客户端的私钥
    cert: fs.readFileSync('./client/client.crt'),//客户端的证书
    ca: fs.readFileSync('./ca/ca.crt')//证书的合法办法结构
};

var client = tls.connect(8080, 'localhost', options, function () {
    console.log('connected');
    client.write('hello');
});
/**
 * 监听事件
 */
client.on('data', function (data) {
    console.log(client);
});
client.on('end', function () {
    client.close();
});

client.on('error', function (err) {
    console.log(err);
});

