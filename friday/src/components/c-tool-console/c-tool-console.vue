<!-- console cmd组件 -->
<style lang="sass">
	
</style>
<template> 
	<cfunctioninfo :name="name">
		<div class="tool-console">
			<div class="tool-console-item">
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
				<label for="cmd" class="request">控制台命令<span class="error-tips" v-show="validate.cmd_error">不能为空！</span></label>
				<div class="box">
					<textarea class="form-control" rows="1" id="cmd" name="cmd" v-model="args.cmd"></textarea>
				</div>
				<button class="btn btn-primary submit-btn" v-on:click="submit">GO</button>
			</div>
			<div class="tool-console-item">
				<h5>我的历史操作</h5>
				<div class="content"></div>
			</div>
		</div>
		<cfunctionlog v-bind:socket="socket" v-if="showLog"></cfunctionlog>
	</cfunctioninfo>
	<cfunctionconfirm v-if="showConfirm" v-on:confirm-result="confirmHandler"></cfunctionconfirm>
</template>
<script>
	import "../c-tool-console/c-tool-console.scss"
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
					'cmd':'',
					'lps':30,
					'parallel':true
				},
				'validate':{
					'svc_name_error':false,
					'ip_ports_error':false,
					'cmd_error':false
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
					}else if(!this.args.cmd.trim()){
						this.validate.cmd_error = true;
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
					var args = splice.objToObj(this.args);
					if(!this.socket){
						this.socket = io.connect('ws://' + document.domain + ':' + location.port + '/friday');
					}
					this.socket.emit('console_cmd',args);
					this.showLog = true;
				}
			}
		}
	}
</script>