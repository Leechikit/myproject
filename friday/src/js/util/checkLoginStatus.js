/*判断登录*/
module.exports=function(callback){
  	if(isLogin()){
		typeof callback == "function" && callback();
	} else {
		showLoginBox();
	}
}