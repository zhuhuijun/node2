/***
 * ss静态资源防盗链
 * @type {exports}
 * s通过检查请求头来判断是否是防盗链
 */
 var express =require('express');
//静态资源中间件
var serveStatic = require('serve-static');
var url =require('url');
var fs =require('fs');
var app =new express();
app.use(function(req,res,next){
	console.log('>>>>>>',req.headers.referer);
	next();
});
//白名单中关于Reference的判断
function checkRefer(writeList){
	return function(req,res,next){
		var refer = req.headers.referer;
		if(!refer) return next();
		var host = url.parse(refer,true).host;
		host =host.split(':')[0];
        console.log(host);
        console.log(writeList.indexOf(host));
		if(writeList.indexOf(host)!=-1){
			next();
		}else{
			res.sendfile('./img/dao.jpg');
		}
	};
}
app.use(checkRefer(['localhost']));//白名单
app.use('/img',serveStatic(__dirname+'/img'));

app.get('/',function(req,res){
	fs.createReadStream('./refer.html').pipe(res);
});
app.listen(3000);