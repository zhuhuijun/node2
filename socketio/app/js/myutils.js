var Utils = Window.Utils || {};
Utils = (function () {
    /****
     * 获得时间的方法
     * @returns {string}
     */
    function GetTime() {
        return new Date().toLocaleDateString();
    }

    /***
     * 增加消息
     * @param msg
     */
    var addmsg = function (msg) {
        var item = '<li class="list-group-item">';
        item += '<span style="color: blue">' + GetTime() + '|</span>';//时间
        item += '<span style="color:red" class="user">' + msg.user + '</span>:' + msg.content;//昵称和内容
        item += '</li>';
        $('#messages').append(item);
    };
    /***
     *向服务器发送消息的方法
     */
    var sendmsg = function (socket) {
        var msg = $("#txtMsg").val();
        socket.send(msg);
        $("#txtMsg").val('');
    };
    /*******************************************************************************************///最后返回的结果调用
    var retU = {
        addMsg: addmsg,
        sendMsg: sendmsg
    };
    return retU;
})();