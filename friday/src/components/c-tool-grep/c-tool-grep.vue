<!-- grep组件 -->
<style lang="sass">
	
</style>
<template> 
	<cfunctioninfo :name="name">
		<div class="tool-grep">
			<div class="tool-grep-item">
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
				<label class="request">IP列表<span class="error-tips" v-show="validate.ip_addrs_error">不能为空！</span></label>
				<div class="ip-list">
					<div class="checkbox" v-show="ipList.length">
					  <label>
					    <input type="checkbox" value="" name="" v-model="isSelectAll" v-on:click="selectAll">
					    全选
					  </label>
					</div>
					<div class="checkbox" v-for=" item in ipList ">
					  <label>
					    <input type="checkbox" value="{{ item }}" name="ip_addrs" v-model="args.ip_addrs">
					    {{ item }}
					  </label>
					</div>
				</div>
				<label for="datetime">开始时间</label>
				<div class="box">
					<input type="text" name="" id="datetime" class="form-control" v-model="args.datetime">
				</div>
				<label for="pattern">关键字</label>
				<div class="box">
					<input type="text" id="pattern" name="pattern" v-model="args.pattern" class="form-control">
				</div>
				<label for="parallel">是否并行</label>
				<div class="box">
					<input type="checkbox" id="parallel" v-model="args.parallel">
				</div>
				<button class="btn btn-primary submit-btn" v-on:click="submit"> GO </button>
			</div>
			<div class="tool-grep-item">
				<h5>我的历史操作</h5>
				<div class="content"></div>
			</div>
		</div>
		<cfunctionlog v-bind:socket="socket" v-if="showLog"></cfunctionlog>
	</cfunctioninfo>
</template>
<script>
	import "../c-tool-grep/c-tool-grep.scss"
	import io from "socket.io-client"
	import http from "../../js/util/http.js"
	import splice from "../../js/util/splice.js"
	import checkLoginStatus from "../../js/util/checkLoginStatus.js"

	export default {
		data() {
			return {
				'args':{
					'svc_name':'',
					'ip_addrs':[],
					'pattern':'',
					'lps':30,
					'datetime':'',
					'parallel':false,
				},
				'validate':{
					'svc_name_error':false,
					'ip_addrs_error':false
				},
				'ipList':[],
				'socket':null,
				'showLog':false
			}
		},
		computed:{
			isSelectAll:function(){
				return this.ipList.length == this.args.ip_addrs.length;
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
						url:"http://friday.yy.com/pyapi/svc_ip_list",
						data:{
							svc_name:this.args.svc_name
						},
						success:function(json){
							this.ipList = json.svc_ip_list;
							this.args.ip_addrs = [];
						}.bind(this)
					})
				}
			},
			enterHandler:function(event){
				this.searchIp(event);
			},
			selectAll:function(event){
				if(!this.isSelectAll){
					this.args.ip_addrs = this.ipList.join().split(',');
				}else{
					this.args.ip_addrs = [];
				}
				this.isSelectAll = !this.isSelectAll;
			},
			submit:function(event){
				event.preventDefault();
				checkLoginStatus(function(){
					if(!this.args.svc_name.trim()){
						this.validate.svc_name_error = true;
					}else if(!this.args.ip_addrs.length){
						this.validate.ip_addrs_error = true;
					}else{
						var args = splice.objToObj(this.args);
						if(!this.socket){
							this.socket = io.connect('ws://' + document.domain + ':' + location.port + '/friday');
						}
						this.socket.emit('grep',args);
						this.showLog = true;
						for(var i in this.validate){
							this.validate[i] = false;
						}
					}
				}.bind(this),true)
			}
		},
		ready() {
			$('#datetime').datetimepicker({
				format:"Y-m-d H:i:s"
			});
		}
	}
</script>