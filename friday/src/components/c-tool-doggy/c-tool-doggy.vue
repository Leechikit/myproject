<!-- doggy组件 -->
<style lang="sass">
	
</style>
<template> 
	<cfunctioninfo :name="name">
		<div class="tool-doggy">
			<div class="tool-doggy-item">
				<label for="svcName" class="request">进程名<span class="error-tips" v-show="validate.svc_name_error">不能为空！</span></label>
				<div class="process-search">
					<form onsubmit="return false;" autocomplete="on" target="the_iframe">
						<input type="submit" class="btn btn-primary" v-on:click="searchIp" value="查询" />
						<div class="input-group">
							<label class="glyphicon glyphicon-search input-group-addon" for="svcName"></label>
							<input type="text" class="form-control" id="svcName" name="svc_name" placeholder="daemon server name" v-model="args.svc_name" v-on:keyup.enter="enterHandler">
						</div>
					</form>
					<iframe id="the_iframe" name="the_iframe" src="javascript:false" style="display:none;"></iframe>
				</div>
				<label class="request">IP列表<span class="error-tips" v-show="validate.ip_ports_error">不能为空！</span></label>
				<div class="ip-list">
					<div class="checkbox" v-show="ipList.length">
					  <label>
					    <input type="checkbox" value="" name="" v-model="isSelectAll" v-on:click="selectAll">
					    全选
					  </label>
					</div>
					<div class="checkbox" v-for=" item in ipList ">
					  <label>
					    <input type="checkbox" value="{{ item }}" name="ip_ports" v-model="args.ip_ports">
					    {{ item }}
					  </label>
					</div>
					<!-- <button class="btn btn-primary selectAll-btn" v-on:click="selectAll" v-show="ipList.length">全选</button> -->
				</div>
				<label>DOGGY选项</label>
				<div class="box-list">
					<label for="doggy_span" class="request">span<span class="error-tips" v-show="validate.doggy_span_error">不能为空！</span></label>
					<div class="box">
						<div class="box-flex">
							<input type="text" class="form-control" id="doggy_span" name="doggy_span" v-model="args.doggy_span">
							<span class="tips" role="button" data-toggle="popover" data-trigger="hover" title="" data-content="Rule的名字" v-on:mouseenter="showTips">?</span>
						</div>
					</div>
					<label for="doggy_uri" class="request">协议uri<span class="error-tips" v-show="validate.doggy_uri_error">不能为空！</span></label>
					<div class="box">
						<div class="box-flex">
							<input type="text" class="form-control" id="doggy_uri" name="doggy_uri" v-model="args.doggy_uri">
							<span class="tips" role="button" data-toggle="popover" data-trigger="hover" title="指定要匹配的URI" data-content="20|110 明确指定URI
							*|110 匹配SVID=110的所有URI
							20|* 匹配CODE=20的所有URI
							-8|110 排除URI 8|110" v-on:mouseenter="showTips">?</span>
						</div>
					</div>
					<label class="request">协议方向<span class="error-tips" v-show="validate.doggy_direction_error">不能为空！</span></label>
					<div class="box">
						<label class="radio-inline">
							<input type="radio" name="doggy_direction" id="" value="in" v-model="args.doggy_direction"> in
						</label>
						<label class="radio-inline">
							<input type="radio" name="doggy_direction" id="" value="out" v-model="args.doggy_direction"> out
						</label>
						<span class="tips" role="button" data-toggle="popover" data-trigger="hover" title="方向" data-content="in表示为探查收到的协议，out为探查发出的协议" v-on:mouseenter="showTips">?</span>
					</div>
					<label class="request">action<span class="error-tips" v-show="validate.doggy_action_error">不能为空！</span></label>
					<div class="box">
						<label class="radio-inline">
							<input type="radio" name="doggy_action" id="" value="pushpop" v-model="args.doggy_action"> pushpop
						</label>
						<label class="radio-inline">
							<input type="radio" name="doggy_action" id="" value="push" v-model="args.doggy_action"> push
						</label>
						<label class="radio-inline">
							<input type="radio" name="doggy_action" id="" value="note" v-model="args.doggy_action"> note
						</label>
						<span class="tips" role="button" data-toggle="popover" data-trigger="hover" title="匹配成功之后触发的动作" data-content="Push 默认动作，压入一个事件
						PushPop 压入事件并立刻弹出
						Note 仅打印一条Note" v-on:mouseenter="showTips">?</span>
					</div>
					<label for="doggy_keyword">匹配关键字</label>
					<div class="box">
						<div class="box-flex">
							<input type="text" class="form-control" id="doggy_keyword" name="doggy_keyword" v-model="args.doggy_keyword">
							<span class="tips" role="button" data-toggle="popover" data-trigger="hover" title="要匹配的关键字列表" data-content="关键字主要包括两大类：无符号整数和字符串。无符号整数又分为1 2 4 8个字节。
							uint32 805519903 匹配32位无符号整数805519903
							string 805519903 匹配文本型字符串“805519903”
							uint32 -805519903 排除32位无符号整数805519903
							uid 805519903 和uint32一样效果" v-on:mouseenter="showTips">?</span>
						</div>
					</div>
				</div>
				<!-- <label for="pattern">附加命令</label>
				<div class="box">
					<textarea class="form-control" rows="1" id="pattern" name="pattern" v-model="args.pattern"></textarea>
				</div> -->
				<button class="btn btn-primary submit-btn" v-on:click="submit"> GO </button>
			</div>
			<div class="tool-doggy-item">
				<h5>我的历史操作</h5>
				<div class="content"></div>
			</div>
		</div>
		<cfunctionlog v-bind:socket="socket" v-if="showLog"></cfunctionlog>
	</cfunctioninfo>
	<cfunctionconfirm v-if="showConfirm" v-on:confirm-result="confirmHandler"></cfunctionconfirm>
</template>
<script>
	import "../c-tool-doggy/c-tool-doggy.scss"
	import io from "socket.io-client"
	import http from "../../js/util/http.js"
	import splice from "../../js/util/splice.js"
	import checkLoginStatus from "../../js/util/checkLoginStatus.js"

	export default {
		data() {
			return {
				'args':{
					'svc_name':'',
					'ip_ports':[],
					'doggy_direction':'',
					'doggy_span':'',
					'doggy_uri':'',
					'doggy_keyword':'',
					'doggy_action':'',
					'lps':30,
					'parallel':true
				},
				'validate':{
					'svc_name_error':false,
					'ip_ports_error':false,
					'doggy_direction_error':false,
					'doggy_span_error':false,
					'doggy_uri_error':false,
					'doggy_action':false
				},
				'ipList':[],
				'socket':null,
				'showLog':false,
				'showConfirm':false,
				'confirmResult':false
			}
		},
		computed:{
			isSelectAll:function(){
				return this.ipList.length == this.args.ip_ports.length;
			}
		},
		props:{
			info:{
				type:Array
			},
			name:{
				type:String
			}
		},
		methods:{
			searchIp:function(event){
				if(this.args.svc_name.trim()){
					http.ajax({
						url:"http://friday.yy.com/pyapi/svc_console_list",
						data:{
							svc_name:this.args.svc_name
						},
						success:function(json){
							this.ipList = json.svc_console_list.map(function(curr){
								return curr.join(':');
							});
							this.args.ip_ports = [];
						}.bind(this)
					})
				}
			},
			enterHandler:function(event){
				this.searchIp(event);
			},
			selectAll:function(event){
				if(!this.isSelectAll){
					this.args.ip_ports = this.ipList.join().split(',');
				}else{
					this.args.ip_ports = [];
				}
				this.isSelectAll = !this.isSelectAll;
			},
			submit:function(event){
				event.preventDefault();
				checkLoginStatus(function(){
					if(!this.args.svc_name.trim()){
						this.validate.svc_name_error = true;
					}else if(!this.args.ip_ports.length){
						this.validate.ip_ports_error = true;
					}else if(!this.args.doggy_span){
						this.validate.doggy_span_error = true;
					}else if(!this.args.doggy_uri){
						this.validate.doggy_uri_error = true;
					}else if(!this.args.doggy_direction){
						this.validate.doggy_direction_error = true;
					}else if(!this.args.doggy_action){
						this.validate.doggy_action_error = true;
					}else{
						this.showConfirm = true;
						for(var i in this.validate){
							this.validate[i] = false;
						}
					}
				}.bind(this),true)
			},
			confirmHandler:function(result){
				this.confirmResult = result;
				this.showConfirm = false;
				if(this.confirmResult){
					var args = splice.objToObj(splice.objToDoggy(this.args));
					if(!this.socket){
						this.socket = io.connect('ws://' + document.domain + ':' + location.port + '/friday');
					}
					this.socket.emit('doggy_cmd',args);
					this.showLog = true;
				}
			},
			showTips:function(event){
				$(event.target).popover('show');
			}
		}
	}
</script>