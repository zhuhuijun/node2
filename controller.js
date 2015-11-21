var http = require('http');
var url = require('url');
/****
 *
 */
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var handler = {
        admin:{
            user: {
                add: function (req, res, username, age) {
                    res.end("add" + username + ">>>" + age);
                },
                delete: function (req, res, id) {
                    res.end("delete" + id);
                }

            }
        }
    };
    var paths = pathname.split('/');


    var finalhandler = handler;
    for (var i = 1; i < paths.length; i++) {//admin
        if (finalhandler[paths[i]]) {
            finalhandler = finalhandler[paths[i]];
            if (typeof finalhandler == "function") break;
        } else {
            res.end("404");
            return;
        }
    }
    var args = paths.splice(i+1);
    if (typeof finalhandler == "function") {
        finalhandler.apply(null, [req, res].concat(args));
    }
}).listen(3000);