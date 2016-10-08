/*对象拼接方法*/
var splice = {
	objToObj:function(obj){
		var args = {};
		for(var i in obj){
			args[i] = obj[i];
			if(args[i] instanceof Array){
				args[i] = args[i].join();
			}
		}
		return args;
	},
	objToDoggy:function(obj){
		var args = {};
		var reg = new RegExp(/doggy_\S+/);
		args.cmd = ["add"];
		for(var i in obj){
			if(i == "doggy_uri"){
				args.cmd.push("uri "+obj[i]);
			}else if(i == "doggy_action"){
				args.cmd.push("action "+obj[i]);
			}else if(reg.test(i) && obj[i].trim()){
				args.cmd.push(obj[i]);
			}else if(!reg.test(i)){
				args[i] = obj[i];
			}
		}
		args.cmd = args.cmd.join(" ");
		return args;
	}
}

module.exports = splice;