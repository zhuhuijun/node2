console.info('mode ');
console.info("%s:%d",'hello',34);
var modu =require('./module');
modu.setName('zhuhj');
console.info('Hello:>>>>%s',modu.getName());

var hello =require('./Hello');
hello.SetName('linqq');
hello.sayHello();