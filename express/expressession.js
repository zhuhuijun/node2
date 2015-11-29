/****
 * 模板
 * cookie-session的实现原理
 * session都是基于cookie实现的
 * @type {exports}
 */
var express = require('express');
var expressSession = require('express-session');
var app = new express();
var serveStatic = require('serve-static');
var MongoStore = require('connect-mongo')(expressSession);
var bodyparser = require('body-parser');
var path = require('path');
var fs = require('fs');
//cookie
var cookieparser = require('cookie-parser');
var users = [];
app.set('view engine', 'html');
app.set('views', __dirname);//设置模板的路径
app.engine('.html', require('ejs').__express);
//静态文件服务
app.use(serveStatic(__dirname));
//使用bodyparser的中间件
app.use(bodyparser.urlencoded({extended: true}));
//cookieparser中间件
app.use(cookieparser());
//cookiesession的中间件
app.use(expressSession({
    secret: 'zfpxkey',
    store: new MongoStore({
        url: 'mongodb://localhost:28017/test_app'
    })
}));
//写cookie
app.get('/write', function (req, res) {
    req.session.name = 'zzbj';
    req.session.age = '6';
    res.send('write cookie');
});
app.get('/read', function (req, res) {
    //var cookie = req.headers['cookie'];
    res.send(req.session);
});
//登录
app.get('/login', function (req, res) {
    req.session.uname = "zhuhj";
    res.send('hello');
});
app.get('/home', function (req, res) {
    if (req.session.uname) {
        res.send('welcome:' + req.session.uname);
    } else {
        res.send('unlogin');
    }
});
app.get('/logout', function (req, res) {
    req.session.uname = null;
    res.send('logout success');
})
app.listen(8080);