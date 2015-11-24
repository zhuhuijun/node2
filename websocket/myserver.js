var url = require('url');
var http = require('http');
var crypto = require('crypto');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
util.inherits(WebSocketServer, EventEmitter);
/***
 * websocket的服务器
 * @param options
 * @param calllback
 * @constructor
 */
function WebSocketServer(options, calllback) {
    var self = this;
    this._server = http.createServer(function (req, res) {
        res.end('not implemented');
    });
    //监听
    this._server.listen(options.port, options.host);
}