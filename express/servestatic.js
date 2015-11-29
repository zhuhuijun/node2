/****
 * 模板
 * 1.安装ejs
 * @type {exports}
 */
var express = require('express');
var app = new express();
var servestatic = require('serve-static');
var bodyparser = require('body-parser');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var users = [];
app.set('view engine', 'html');
app.set('views', __dirname);//设置模板的路径
app.engine('.html', require('ejs').__express);
//静态文件服务
app.use(servestatic(__dirname));
//使用bodyparser的中间件
app.use(bodyparser.urlencoded({extended: true}));
//上传中间件
var upload = multer({ dest: 'uploads/'})
/*********************************************************///请求的路由
app.param('uid', function (req, res, next) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].uid == req.params.uid) {
            req.user = users[i];
            break;
        }
    }
    next();
});
//修改
app.use('/user/edit/:uid', function (req, res) {
    var uid = req.params.uid;
    res.render('form', {user: req.user});
});
//查看
app.use('/user/:uid', function (req, res) {
    var uid = req.params.uid;
});
app.post('/users/add', upload.single('avator'),
    function (req, res) {
        console.log(req.body.username);
        users.push(req.body);
        //res.json(req.body);
        var pathdir = path.join(__dirname, 'uploads');
        fs.writeFile(pathdir + '/' + req.file.originalname, req.file.buffer);
        console.log(req.file);
        res.json(req.file);
    }
)
;
app.listen(8080);