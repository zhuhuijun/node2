var express = require('express');
var app = new express();


app.get('/', function (req, res) {
    res.end('hello world');
});


app.listen(8080);