/****
 * 模板
 * 1.安装ejs
 * @type {exports}
 */
var express = require('express');
var app = new express();
app.set('view engine', 'ejs');
app.set('views', __dirname);//设置模板的路径
app.get('/', function (req, res) {
    res.render('refer', {username: 'zhuhj'});
});
app.listen(8080);