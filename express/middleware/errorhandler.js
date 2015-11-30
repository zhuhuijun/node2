var express = require('express');
var app = express();
var user = require('./routes/user');
var blog = require('./routes/blog');
var routes = require('./routes/index');
//中间件
/*app.use(function (req, res, next) {
 if (req.username) {
 next();
 } else {
 throw Error('no username');
 }
 });*/
app.use('/', routes);
app.use('/user', user);
app.use('/blog', blog);
app.use(function (err, req, res, next) {
    console.log(err);
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end('服务器出问题了');
});
app.listen(8080);
