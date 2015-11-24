/**
 * da代理服务器的使用方式
 * dd通过host实现多个网站公用一个端口
 *
 * @type {exports}
 */
var express = require('express');
//静态资源中间件
var serveStatic = require('serve-static');
var url = require('url');
var fs = require('fs');
var httpproxy = require('http-proxy');
var forwared = require('forwarded');
var app = new express();

app.use('/img', serveStatic(__dirname + '/img'));
/***
 *
 * @param host
 * @param target
 * @returns {Function}
 */
function proxy(host, mytarget) {
    console.log('ddddddd');
    var newhost = url.parse(mytarget).host;
    var proxy = httpproxy.createProxyServer();
    proxy.on('proxyReq', function (proxyReq, req, res, options) {
        proxyReq.setHeader('host', newhost);
        console.log(forwared(req));
        proxyReq.setHeader('X-Real-IP', forwared(req));
    });
    proxy.on('proxyRes', function (proxyRes, req, res, options) {
        res.setHeader('X-Proxy-By', 'node.js');
    });
    return function (req, res, next) {
        var currhost = req.headers.host;
        if (host == currhost) {
            proxy.web(req, res, {
                target: mytarget
            });
        } else {
            next();
        }
    };
}
app.use(proxy('a.zfpx.cn', 'http://www.baidu.com/'));
app.listen(3000, 'localhost');