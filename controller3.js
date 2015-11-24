/***
 * s实现手工配置路由
 * @type {exports}
 */
 var http = require('http');
 var url = require('url');
 function add(req, res) {
 	res.end('add');
 }
  // /user/add/:username/:age
  function reg(pathname){
  	var keys=[];
  	pathname = pathname.replace('/:(\w+)/g',function(){
  		keys.push(arguments[1]);
  		return "(\\w+)";
 		 // /user/add/(\\w+))/(\\w+)
  });
  	return{
  		keys:keys,
  		regex:new RegExp('^'+pathname.replace(new RegExp('/',g),'\\/')+'$')
 		// /\user/\add/\(\\w+))/\(\\w+)
};
}
var routes = [];
function use(path, action) {
	routes.push([reg(path), action]);
}

use('/user/add', add);
use('/add/user', add);
use('/add/user/:uname/:age', add);
http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;
	console.log(pathname);
	for (var i = 0; i < routes.length; i++) {
		var route = routes[i];
		var reg = route[0].regex;
		var keys = route[0].keys;
		var matched = reg.exec(pathname);
		if(matched){
			
		}
	}
	res.end('404');

}).listen(3000);
