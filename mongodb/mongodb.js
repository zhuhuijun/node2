var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1:28017/node2", function (err, db) {
    if (err) {
        console.log(err);
    }
    else {
        db.collection('person').save({name: 'zhuhj', age: 29}, function (err, res) {
            console.log(res);
            db.close();
        });
    }
})

