<!-- 日志组件 -->
<style lang="sass">
	
</style>
<template> 
	<div class="fri-log">
		<div class="log-box">
			<pre class="log-content">
				<!-- <div class="log-item" v-for=" item in logCache ">{{ item }}</div> -->
				<!-- <div class="log-item">2016-08-18 20:43:03:[App/0] 10.10.68.160 - - [18/Aug/2016:12:43:03 +0000] "GET / HTTP/1.1" 200 3988 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"</div>
				<div class="log-item">2016-08-18 20:43:03:[App/0] 10.10.68.160 - - [18/Aug/2016:12:43:03 +0000] "GET / HTTP/1.1" 200 3988 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"</div>
				<div class="log-item">2016-08-18 20:43:03:[App/0] 10.10.68.160 - - [18/Aug/2016:12:43:03 +0000] "GET / HTTP/1.1" 200 3988 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"</div>
				<div class="log-item">2016-08-18 20:43:03:[App/0] 10.10.68.160 - - [18/Aug/2016:12:43:03 +0000] "GET / HTTP/1.1" 200 3988 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"</div> -->
			</pre>
		</div>
		<div class="log-bar">
			<div class="control-btn-group pull-left">
				<div class="control-btn">
					<button type="button" class="btn btn-primary" v-on:click="pause">{{ isStart == true ? '暂停' : '开始' }}</button>
					<!-- <button type="button" class="btn btn-primary" v-on:click="clear">清空</button> -->
				</div>
			</div>
			<div class="search-group pull-right">
				<input type="text" class="form-control search-text" placeholder="搜索关键字" v-model="searchText"> <button type="button" class="btn btn-primary btn-search" v-on:click="search">搜索</button>
			</div>
		</div>
	</div>
</template>
<script>
	import "../c-function-log/c-function-log.scss"
	import io from "socket.io-client"
	export default {
		data () {
		  return {
		  	isStart:false,
		  	logCache:[], //日志缓存
		  	logPointer:0, //日志指针
		  	LOGMAX:50, // 最大显示值
		  	searchText:""
		  };
		},
		props:{
            'socket':{
                type:Object
            }
        },
        methods:{
        	pause(event){
        		event.preventDefault();
				if(this.isStart){
					this.socket.emit('control',{status:'suspend'});
				}else{
					this.socket.emit('control',{status:'resume'});
				}
				this.isStart = !this.isStart;
        	},
        	search(event){
        		event.preventDefault();
        		searchHandler(this.searchText);
        		function searchHandler(keywords){
					var textArrs = [];
					var regKeywords = keywords.trim().replace(/([\.\$\^\{\[\(\)\*\+\?\\])/g,'\\'+'$1');
					var reg = new RegExp('('+regKeywords+')','g');
					var text = '';
					var rtext = '';
					var rdom = null;
					$('.log-content .log-item').each(function(index, el) {
						text = $(el).text();
						if(regKeywords){
							rtext = text.replace(reg,'<span class="u">$1</span>');
							rdom = $('<div>').addClass('log-item').append(rtext);
							textArrs.push(rdom);
						}else{
							rdom = $('<div>').addClass('log-item').append(text);
							textArrs.push(rdom);
						}
					});
					$('.log-content').empty().append(textArrs);
				};
        	}/*,
        	clear(event){
        		this.isStart = false;
        		this.logCache = [];
        		this.logPointer = 0;
        		this.socket.emit('control',{status:'stop'});
        		setTimeout(()=>$('.log-content').empty(),200);
        	}*/
        },
		ready (){
			window.logCache = [];
			var self = this;
			var data = null;
			var $box = $('.log-box');
			var $con = $('.log-content');
			var conHeight = 0;
			var boxHeight = $box.height();
			var lock = false;

			this.socket.on('output_begin',function(msg){
				this.isStart = true;
			}.bind(this));
			this.socket.on('output',function(msg){
				if(msg.data){
					data = msg.data.split('\n');
					data.forEach(function(item){
						cutLog();
						this.logCache.push(item);
						$con.append('<div class="log-item">'+item+'</div>');
						conHeight = $con.height();
						$box.scrollTop(conHeight);
					}.bind(this))
				}
			}.bind(this));

			$box.scroll(function(event) {
				if($(this).scrollTop() < (conHeight-boxHeight) && self.isStart){
					self.isStart = false;
					self.socket.emit('control',{status:'suspend'})
				}else if( $(this).scrollTop() == 0 && !self.isStart && self.logPointer > 0 && !lock){
					// console.log('prepend')
					$con.prepend('<div class="log-item loading">Loading<span class="square"></div>');
					lock = true;
					setTimeout(function(){
						var prependCon = '';
						$con.find('.loading').remove();
						// console.log(self.logPointer - self.LOGMAX,self.logPointer)
						self.logCache.slice(self.logPointer - self.LOGMAX,self.logPointer).forEach(function(item){
							prependCon += '<div class="log-item">'+item+'</div>';
						})
						$con.prepend(prependCon);
						$box.scrollTop($con.height()-conHeight);
						conHeight = $con.height();
						self.logPointer -= self.LOGMAX;
						lock = false;
						// console.log('afterprepend:'+self.logPointer)
					},1200);
				}else if( $(this).scrollTop() == (conHeight-boxHeight) ){
					// console.log('reset1')
					if(self.logCache.length > self.logPointer + 2*self.LOGMAX){
						// console.log('reset2')
						self.logPointer = Math.floor(self.logCache.length / self.LOGMAX - 1) * self.LOGMAX;
					}
				}
			});

			function cutLog(){
				// console.log("pointer:"+self.logPointer+"   "+"cacheLen:"+self.logCache.length)
				if(self.logCache.length >= self.logPointer + 2*self.LOGMAX){
					self.logPointer = Math.floor(self.logCache.length / self.LOGMAX - 1) * self.LOGMAX;
					// console.log('change:'+self.logPointer)
					$con.find('.log-item').slice(0,self.LOGMAX).remove();
				}
			}
		},
		destroyed() {
        	this.socket.disconnect();
        	this.socket.emit('control',{status:'stop'});
		}
	}
</script>