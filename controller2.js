var http = require('http');
var url = require('url');
var fs = require('fs');
/****
 *
 */
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;

    var paths = pathname.split('/');
    var filepath = './route';
    for (var i = 1; i < paths.length; i++) {//admin
        filepath = filepath + "/" + paths[i];
        var exists = fs.existsSync(filepath);
        if (exists) {
            var state = fs.statSync(filepath);

            if (state.isFile()) {
                break;
            }
        } else {
            res.end("404");
            return;
        }
    }

    var route = require(filepath);
    var args = paths.splice(i + 2);
    route[paths[i + 1]].apply(null, [req, res].concat(args));
}).listen(3000);