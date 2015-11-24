/*****
 * static server demo
 *
 *
 * 如何服务器支持断点续传
 * 1.首先要告诉客户端
 * res.setHeader('Accept-Ranges','bytes')
 * 2.服务器通过请求头中的Ranges'：'0-5'来判断是否做Range的请求
 * @type {exports}
 */
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('mime');
var zlib = require('zlib');
var config = require('./config');
var server = http.createServer(function (req, res) {
    var pathName = url.parse(req.url).pathname;
    if (pathName == "/favicon.ico") return res.end('404');//去掉图标
    if (pathName.slice(-1) == '/') {
        pathName += 'index.html';
    }
    var realpath = path.join('public', pathName);
    console.log(realpath);
    var ext = path.extname(realpath);//文件扩展名
    if (ext.match(config.CachedType.fileMatch)) {//缓存匹配
        fs.stat(realpath, function (err, stat) {
            var lastModified = stat.mtime.toUTCString();
            var modifiedsince = req.headers['if-modified-since'];//请求头的时间
            if (modifiedsince && modifiedsince == lastModified) {//文件是否修改
                res.writeHead(304);
                return res.end(http.STATUS_CODES[304]);
            } else {
                //过期时间
                var exprise = new Date(new Date().getTime() + config.CachedType.maxAge);
                res.setHeader('Expires', exprise.toUTCString());
                res.setHeader('Cache-Control', 'max-age=' + config.CachedType.maxAge);
                res.setHeader('Last-Modified', lastModified);


                //res.writeHead(200, {'Content-Type': mime.lookup(realpath)});
                //fs.createReadStream(realpath).pipe(res);
                //请求的范围
                var ranges = req.headers['range'];
                if (ranges) {
                    var utillls = require('./utils');
                    var rangeobj = utillls.Utils.parseRange(ranges, stat.size);
                    res.setHeader('Content-Range', 'bytes ' + rangeobj.start + '-' + rangeobj.end + '/');//部分读取需要追加头部
                    res.setHeader('Content-Length', rangeobj.end - rangeobj.start + 1);
                    //压缩
                    var raw = fs.createReadStream(realpath, rangeobj);//原始流//只读//后面追加的是关于读取范围的对象
                    res.writeHead(206, {'Content-Type': mime.lookup(realpath), 'Accppt-Ranges': 'bytes'});
                    raw.pipe(res);
                } else {
                    var raw = fs.createReadStream(realpath);//原始流//只读//后面追加的是关于读取范围的对象
                    var acceptEncoding = req.headers['accept-encoding'];
                    var matched = ext.match(config.CompressType.match);
                    if (matched) {
                        if (acceptEncoding.match(/\bgzip\b/)) {
                            res.writeHead(200, 'ok', {'Content-Encoding': 'gzip',
                                'Content-Type': mime.lookup(realpath),
                                'Accppt-Ranges': 'bytes'
                            });//告诉浏览器解压
                            raw.pipe(zlib.createGzip()).pipe(res);
                        }
                    }
                }
            }
        });
    } else {
        res.writeHead(200, {'Content-Type': mime.lookup(realpath), 'Accppt-Ranges': 'bytes'});
        fs.createReadStream(realpath).pipe(res);
    }
}).listen(3000);
