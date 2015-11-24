 var name='';
 var Hello={
 	SetName:function(tmpname){
 		name=tmpname;
 	},
 	sayHello:function(){
 		console.info(">>>>>>",name);
 	}
 };

 module.exports=Hello;