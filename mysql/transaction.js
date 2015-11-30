var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'zzbj891016',
    database: 'node2'
});
connection.connect();
connection.beginTransaction(function (err) {
    if (err) throw err;
    connection.query('update userinfos set balance=balance-500 where id=1', function (err, res) {
        if (err) {
            connection.rollback(function () {
                throw err;
            })
        }
        connection.query('update userinfos set balance=balance+500 where id=2', function (err, res) {
            if (err) {
                connection.rollback(function (err) {
                    throw err;
                })
            }
            connection.commit(function (err) {
                if (err) {
                    connection.rollback(function () {
                        throw err;
                    });
                }

                console.log('success');
            });
        });
    });
});