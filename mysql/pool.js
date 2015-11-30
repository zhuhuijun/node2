var mysql = require('mysql');
var pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'zzbj891016',
    database: 'node2',
    connectionLimit: 2,//连接池中最多可以创建多少个连接数
    queueLimit: 8,//队伍中的等待的数量最多有8个可以等待
    acquireTimeout: 10000//默认的等待时间
});

/*pool.query('select * from userinfos', [], function (err, resu) {
 console.log(resu);
 });*/
///连接
pool.on('connection', function () {
    console.log('new connection');
});
//当一个回掉进入队列等待调用时触发
pool.on('enqueue', function () {
    console.log('enqueue');
});
console.time('cost');
function getQuery() {
    pool.getConnection(function (err, connection) {
        connection.query("select *  from userinfos", function (err, res) {
            console.log(res.length);
            console.timeEnd('cost');
            setTimeout(function () {
                connection.release();
            }, 1000);

        });
    });
}
getQuery();
getQuery();
getQuery();
getQuery();
