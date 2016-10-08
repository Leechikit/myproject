/*http请求*/
function Http(){

}
Http.prototype = {
	ajax:function(opts){
		if(!opts.url) return;
		jQuery.getJSON(opts.url, opts.data, opts.success);
		
	}
}
Http.prototype.constructor = Http;

module.exports = new Http();