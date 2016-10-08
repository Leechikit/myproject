<!-- 下载组件 -->
<style lang="sass">
	
</style>
<template> 
	<div class="fri-download">
		<div class="download-head"><strong>下载区</strong></div>
		<div class="download-content">
			<div class="download-item" v-for="item in downloadUrl">
				<div class="download-text">
					<pre>
		                <span class="text">{{ item }}</span>
		            </pre>
				</div>
				<div class="button-list">
					<span class="button copy-btn" data-clipboard-text="{{ item }}" data-toggle="tooltip" data-placement="bottom" data-original-title="{{ copyTips }}" v-on:mouseenter="showCopyTips" v-on:mouseleave="hideCopyTips">Copy</span>
					<a class="button download-btn" href="{{ item }}">Download</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import "../c-function-download/c-function-download.scss"
	import Clipboard from 'clipboard'

	export default {
		data() {
			return {
				'copyTips':'Copy to clipboard'
			}
		},
		props:{
			'downloadpath':{}
		},
		computed:{
			downloadUrl:function(){
				var urls = [];
				var url = "http://friday.yy.com";
				if(this.downloadpath){
					if(this.downloadpath instanceof Array){
						this.downloadpath.forEach(function(item){
							urls.push(url+item);
						})
					}else{
						urls.push(url+this.downloadpath);
					}
				}
				return urls;
			}
		},
		methods:{
			showCopyTips:function(event){
				$(event.target).tooltip('show');
			},
			hideCopyTips:function(event){
				$(event.target).tooltip('hide');
				this.copyTips = 'Copy to clipboard';	
			}
		},
		ready() {
			var self = this;
			var clipboard = new Clipboard('.copy-btn');
			clipboard.on('success', function(e) {
				$(event.target).tooltip('destroy');
				self.copyTips = 'Copied!';
				setTimeout(function(){
					$(e.trigger).tooltip('show');
				},500)
			    /*console.info('Action:', e.action);
			    console.info('Text:', e.text);
			    console.info('Trigger:', e.trigger);*/

			    e.clearSelection();
			});
		}
	}
</script>