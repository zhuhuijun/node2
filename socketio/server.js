var path = require('path');
var fs = require('fs');
var serveStatic = require('serve-static');
var express = require('express');
var app = new express();
var server = require('http').createServer(app)
var io = require('socket.io')(server);

app.use(serveStatic(path.join(__dirname, 'app')));
app.get('/', function (req, res) {
    fs.createReadStream('./index.html').pipe(res);
});
var users = {};//用户信息的对象
io.on('connection', function (socket) {
    var username;
    socket.send({user: 'System', content: '请输入昵称'});
    console.log('>>>>:用户已经连接');
    socket.on('disconnect', function () {
        console.log('>>>>:用户已经断开');
    });
    //监听客户端的message事件
    socket.on('message', function (data) {
        //console.log('>>>>:Client>>>>', data);
        if (username) {
            //提取私聊的用户名@zhangsan hello
            var result = data.match(/^@(.+)\s(.*)/);
            if (result) {//私聊的在下判断
                var touser = result[1];
                var msgddd = result[2];
                if (users[touser]) {//用户在线
                    users[touser].send({user: username, content: username + '对你说:' + msgddd});
                    //看到自己的话语
                    socket.send({user: username, content: msgddd});
                } else {//用户不在线
                    users[username].send({user: 'System', content: '你要私聊的人不在线'});
                    //  socket.send({user: 'System', content: '你要私聊的人不在线'});
                }
            } else {//非私聊
                io.send({user: username, content: data});
            }

        } else {
            username = data;
            users[username] = socket;//保存用户信息
            io.send({user: 'System', content: '欢迎' + username + '加入聊天室'});
        }
        //告诉所有的客户端发送消息
        //io.send(data);
        //io.emit('message', data);
        // socket.send('>>>>:server:hello');
    });
})
server.listen(3000);