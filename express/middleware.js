/****
 * 在处理http的请求中
 * @type {exports}
 */
var express = require('express');
var app = new express();

/******************///统一的日志记录
app.use(function (req, res, next) {
    /*************************************///重写end
    var _end = res.end;
    res.end = function () {
        console.log(req.method, req.url, res.statusCode, res.getHeader('Content-Length'));
        _end.apply(this, Array.prototype.slice.call(arguments));
    };
    next();
});



app.get('/', function (req, res) {
    res.end('hello world');
});

app.use('/coffee', function (req, res, next) {
    res.coffee = 'add water';
    next();
});

app.use('/coffee', function (req, res, next) {
    res.coffee += 'dadd coffee';
    next();
});

app.use('/coffee', function (req, res, next) {
    res.coffee += 'dadd sugar';
    next();
});

app.get('/coffee', function (req, res, next) {
    res.write(res.coffee);
    next();
});


app.get('/coffee', function (req, res) {
    console.log(req.method, req.url, res.statusCode);
    res.end(res.coffee);
});
app.get('/water', function (req, res, next) {
    res.statusCode = 200;
    res.setHeader('Content-Length', 5);
    res.end('water');
    next();

});
/******************///统一的日志记录
app.use(function (req, res, next) {
    console.log(req.method, req.url, res.statusCode, res.getHeader('Content-Length'));
    next();
});
app.listen(8080);