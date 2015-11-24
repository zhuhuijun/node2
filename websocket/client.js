var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8080');
/***
 * 打开链接
 */
ws.on('open', function () {
    ws.send('hello,world');
});

/***
 * 响应的方法
 */
ws.on('message', function (data, flag) {
    console.log(data.toString());
})