/****
 * 模板
 * 1.安装ejs
 * @type {exports}
 */
var express = require('express');
var app = new express();
app.set('view engine', 'html');
app.set('views', __dirname);//设置模板的路径
app.engine('.html', require('ejs').__express);
app.get('/', function (req, res) {
    res.render('index', {username: 'zhuhj'});
});
app.listen(8080);