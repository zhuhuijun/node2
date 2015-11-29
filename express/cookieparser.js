/****
 * 模板
 * 1.安装ejs
 * @type {exports}
 */
var express = require('express');
var app = new express();
var servestatic = require('serve-static');
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
app.use(servestatic(__dirname));
//使用bodyparser的中间件
app.use(bodyparser.urlencoded({extended: true}));
//cookieparser中间件
app.use(cookieparser());
//写cookie
app.get('/write', function (req, res) {
    res.setHeader('Set-Cookie', 'name=zhuhj');
    res.send('write cookie');
});
app.get('/read', function (req, res) {
    //var cookie = req.headers['cookie'];
    res.send(req.cookies);
});
app.listen(8080);