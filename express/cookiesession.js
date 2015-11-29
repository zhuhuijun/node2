/****
 * 模板
 * cookie-session的实现原理
 * session都是基于cookie实现的
 * @type {exports}
 */
var express = require('express');
var expressSession = require('express-session');
var app = new express();
var servestatic = require('serve-static');
var bodyparser = require('body-parser');
var path = require('path');
var fs = require('fs');
//cookie
var cookieparser = require('cookie-parser');
var cookiesession = require('cookie-session');
var users = [];
app.set('view engine', 'html');
app.set('views', __dirname);//设置模板的路径
app.engine('.html', require('ejs').__express);
//静态文件服务
app.use(servestatic(__dirname));
//使用bodyparser的中间件
app.use(bodyparser.urlencoded({extended: true}));
//cookieparser中间件
app.use(cookieparser());
//cookiesession的中间件
app.use(cookiesession({
    secret: 'zfpxkey'
}));
//写cookie
app.get('/write', function (req, res) {
    req.session.name = 'zzbj';
    res.send('write cookie');
});
app.get('/read', function (req, res) {
    //var cookie = req.headers['cookie'];
    res.send(req.cookies);
});
app.listen(8080);