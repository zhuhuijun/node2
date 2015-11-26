/****
 * 模板
 * 1.安装ejs
 * @type {exports}
 */
var express = require('express');
var app = new express();
var servestatic = require('serve-static');
var bodyparser = require('body-parser');

//静态文件服务
app.use(servestatic(__dirname));
//使用bodyparser的中间件
app.use(bodyparser.urlencoded({extended: true}));
/*********************************************************///请求的路由
app.post('/user/add', function (req, res) {
    console.log(req.body.username);
    res.json(req.body);
});
app.listen(8080);