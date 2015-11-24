var url = require('url');
var http = require('http');
var crypto = require('crypto');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
util.inherits(WebSocketServer, EventEmitter);

/***
 * 加密的算法
 * @param key
 * @returns {*}
 */

function shaKey(key) {
    var shasum = crypto.createHash('sha1');
    shasum.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
    var expKey = shasum.digest('base64');//期望的key
    return expKey
}
/***
 * websocket的服务器
 * @param options
 * @param calllback
 * @constructor
 */
function WebSocketServer(options) {
    var self = this;
    this._server = http.createServer(function (req, res) {
        res.end('not implemented');
    });
    //监听
    this._server.listen(options.port, options.host);
    this._server.on('upgrade', function (req, socket, upgradehead) {
        self.socket = socket;
        socket.setEncoding('utf8');
        var key = req.headers['sec-websocket-key'];
        key = shaKey(key);
        var headers = [
            "HTTP/1.1 101 Switching Protocols",
            "Upgrade:websocket",
            "Connection:Upgrade",
            "Sec-WebSocket-Accept:" + key
        ];
        socket.write(headers.concat('', '').join('\r\n'));
        socket.on('data', function (msg) {
            self.emit('message', msg);
        })
    });
}
/***
 * 发送的方法
 * @param msg
 */
WebSocketServer.prototype.send = function (msg) {
    console.log('>>>send:');
    this.socket.write(msg);
};
/*****************************************************************************///测试
var wss = new WebSocketServer({port: 8080});
/****
 * 客户端链接到服务器触发的事件
 */

    //服务器监听客户端的消息
wss.on('message', function (message) {
    console.log('receive:%s', message);
    //服务器向客户端发消息
    wss.send('>>>>:你好客户端....');
});
