var url = require('url');
var http = require('http');
var crypto = require('crypto');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
//继承
util.inherits(WebSocket, EventEmitter);
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
 * 要继承的函数
 * @constructor
 */
function WebSocket(address) {//  ws://localhost:8080
    var self = this;
    var key = new Buffer(('-' + Date.now()).toString("base64"));
    var expKey = shaKey(key);
    var serverurl = url.parse(address);
    var reqoptions = {
        host: serverurl.hostname,
        port: serverurl.port,
        headers: {
            Connection: "Upgrade",
            Upgrade: 'websocket',
            "Sec-WebSocket-Version": 13,
            Host: serverurl.host,
            "Sec-WebSocket-Key": key,
            'Sec-WebSocket-Extensions':'permessage-deflate client_max_window_bits'
        }
    };
    var req = http.request(reqoptions);
    req.on('upgrade', function (res, socket, upgradehead) {
        console.log(res.headers);
        self.socket = socket;
        //校验服务器的返回是否合法
        var serverkey = res.headers['sec-websocket-accept'];
        if (serverkey == expKey) {
            self.emit('open');
        } else {
            console.log('key is error');
        }
    });
    req.end();//真正发起http请求
}
/****
 * 客户端向服务器发送消息
 * @param data
 */
WebSocket.prototype.send = function (data) {
    this.socket.write(data);
};
/**************************************************************************///测试

var ws = new WebSocket('ws://localhost:8080');
/***
 * 打开链接
 */
ws.on('open', function () {
    console.log('opened');
    ws.send(new Buffer('dddd'));
});

/***
 * 响应的方法
 */
ws.on('message', function (data, flag) {
    console.log(data.toString());
})