/***
 * ss静态资源防盗链
 * @type {exports}
 * s关于多语言的设置
 *  Accept-Language:en,zh-CN;q=0.8,zh;q=0.6
 */
var express = require('express');
//静态资源中间件
var serveStatic = require('serve-static');
var url = require('url');
var fs = require('fs');
var app = new express();
/**
 * 检测语言的版本
 * 选择合适的语言
 * 取决于服务端有什么语言,客户端使用什么语言
 * @returns {check}
 */
function checkLanguage(langus) {
    var defaultlan = langus[0].toLowerCase();

    var check = function (req, res, next) {
        var acceptl = req.headers["accept-language"];
        var oderlan = [];
        console.log(acceptl);
        acceptl.split(',').forEach(function (lan) {
            console.log(lan);
            oderlan.push(lan.split(';')[0]);
        });
        for (var i = 0; i < oderlan.length; i++) {
            if (langus.indexOf(oderlan[i]) != -1) {
                req.selectedLan = oderlan[i];
                next();
                break;
            }
        }
        req.selectedLan = defaultlan;
    };
    return check;
}
app.use(checkLanguage(["en", "zh-CN"]));

app.use('/img', serveStatic(__dirname + '/img'));

app.get('/', function (req, res) {
    fs.createReadStream('./lang/' + req.selectedLan + '/index.html').pipe(res);
});
app.listen(3000);