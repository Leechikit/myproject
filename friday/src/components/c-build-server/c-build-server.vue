<!-- 服务器代码生成组件 -->
<style lang="sass">
	
</style>
<template> 
	<cfunctioninfo :name="name">
		<div class="build-server">
			<div class="build-server-item">
				<label for="svcName" class="request">服务名<span class="error-tips" v-show="validate.svc_name_error">不能为空！</span></label>
				<div class="box">
					<input type="text" class="form-control" id="svcName" name="svc_name" placeholder="daemon server name" v-model="args.svc_name" v-on:change="svcChange">
				</div>
				<label for="className" class="request">类名<span class="error-tips" v-show="validate.cls_name_error">不能为空！</span></label>
				<div class="box">
					<input type="text" class="form-control" id="className" name="cls_name" value="{{ args.svc_name }}" placeholder="class name" v-model="args.cls_name">
				</div>
				<label>功能选择</label>
				<div class="select-list">
					<div class="checkbox" v-show="selectList.length">
					  <label>
					    <input type="checkbox" value="" name="" v-model="isSelectAll" v-on:click="selectAll">
					    全选
					  </label>
					</div>
					<div class="checkbox" v-for=" item in selectList ">
					  <label>
					    <input type="checkbox" value="{{ item }}" name="components" v-model="args.components">
					    {{ item }}
					  </label>
					</div>
				</div>
				<button class="btn btn-primary submit-btn" v-on:click="submit">提交</button>
			</div>
			<div class="build-server-item">
				<cfunctiondownload :downloadpath="downloadPath"></cfunctiondownload>
			</div>
		</div>
	</cfunctioninfo>
</template>
<script>
	import "../c-build-server/c-build-server.scss"
	import io from "socket.io-client"
	import http from "../../js/util/http.js"
	import splice from "../../js/util/splice.js"
	import checkLoginStatus from "../../js/util/checkLoginStatus.js"

	export default {
		data() {
			return {
				'args':{
					'svc_name':'',
					'cls_name':'',
					'components':[]
				},
				'validate':{
					'svc_name_error':false,
					'cls_name_error':false
				},
				'selectList':[],
				'downloadPath':null,
				'socket':null
			}
		},
		computed:{
			isSelectAll:function(){
				return this.selectList.length == this.args.components.length;
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
			svcChange:function(event){
				if(!this.args.cls_name.trim()){
					this.args.cls_name = this.args.svc_name;
				}
			},
			selectAll:function(event){
				if(!this.isSelectAll){
					this.args.components = this.selectList.join().split(',');
				}else{
					this.args.components = [];
				}
				this.isSelectAll = !this.isSelectAll;
			},
			submit:function(event){
				event.preventDefault();
				checkLoginStatus(function(){
					if(!this.socket){
						this.socket = io.connect('ws://' + document.domain + ':' + location.port + '/friday');
						this.socket.on('acp_create_rsp',function(msg){
							this.downloadPath = msg.url;
						}.bind(this));
					}
					if(!this.args.svc_name.trim()){
						this.validate.svc_name_error = true;
					}else if(!this.args.cls_name.length){
						this.validate.cls_name_error = true;
					}else{
						var args = splice.objToObj(this.args);
						this.socket.emit('acp_create',args);
						for(var i in this.validate){
							this.validate[i] = false;
						}
					}
				}.bind(this),true)
			}
		},
		ready() {
			http.ajax({
				url:'http://friday.yy.com/pyapi/acp_cpns',
				success:function(json){
					this.selectList = json.acp_cpns;
				}.bind(this)
			});
		},
		destory() {
			this.socket.disconnect();
        	this.socket.emit('control',{status:'stop'});
		}
	}
</script>