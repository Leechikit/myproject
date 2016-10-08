<!-- 自动测试页面 -->
<template>
	<cfunctionchecklogin>
		<csidebar current="test"></csidebar>
		<div class="fri-main">
			<cfunctionsummary :summary="summary"></cfunctionsummary>
			<cfunctioninfo flexbox="true">
				<div class="fri-flex-2">
					<cfunctionbox name="Agent列表">
						<ctestagent :agent-data="agentData"></ctestagent>
					</cfunctionbox>
				</div>
				<div class="fri-flex-1">
					<cfunctionbox name="测试接口列表">
						<ctestinterface :list="interfaceList" :trigger-interface="triggerInterface"></ctestinterface>
					</cfunctionbox>
				</div>
				<div class="fri-flex-1">
					<cfunctionbox name="测试用例列表">
						<ctestcase :list="caseList" :show-form="showForm" :trigger-case="triggerCase"></ctestcase>
					</cfunctionbox>
				</div>
			</cfunctioninfo>
			<ctestform v-if="showForm" :msg="formMsg" :current="current"></ctestform>
		</div>
	</cfunctionchecklogin>
</template>
<script>
	import io from "socket.io-client"

	export default {
		data () {
		  return {
            "summary":[{
                "title": "欢迎使用自动测试"
            }],
            "current":{
            	"interface":"",
            	"host":"",
            	"port":""
            },
            "agentData":{},
            "interfaceList":null,
            "caseList":null,
            "showForm":false,
            "triggerInterface":false,
            "triggerCase":false,
            "formMsg":{}
		  };
		},
		events:{
			"create-interface"(msg) {
				var data = {
					"key": window.getLoginUserName(),
					"host": msg.host,
					"port": msg.port
				};
				this.current.host = data.host;
				this.current.port = data.port;
				this.triggerInterface = true;
				this.interfaceList = null;
				this.caseList = null;

				this.socket.emit("query_apis",data);
			},
			"create-case"(msg){
				this.caseList = msg.case;
				this.current.interface = msg.interface_name;
				this.triggerCase = true;
			},
			"create-form"(msg) {
				this.formMsg = msg;
				this.showForm = true;
			},
			"delete-form"() {
				this.showForm = false;
			},
			"commit-case"(msg) {
				var data = {
					"uri":"commit_test_case",
					"key": window.getLoginUserName(),
					"host": msg.host,
					"port": msg.port,
					"function_name": this.current.interface,
					"case": msg.case
				};
				this.socket.emit("commit_test_case",data);
			}
		},
		ready() {
			if(!this.socket){
				this.socket = io.connect('ws://' + document.domain + ':' + location.port + '/friday');
			}
			this.socket.emit("query_agents",{"key":window.getLoginUserName()});
			//获取agent回调
			this.socket.on("query_agents_rsp",function(json){
				this.agentData = json;
			}.bind(this));
			//获取接口回调
			this.socket.on("query_apis_rsp",function(json){
				if(json.result == "ok"){
					this.interfaceList = json.apis;
					this.$broadcast("agent-error",true);
				}else if(json.result == "error"){
					this.$broadcast("agent-error",false);
				}
			}.bind(this));
			//获取用例回调
			this.socket.on("commit_test_case_rsp",function(json){
				if(json.result == "ok"){
					this.$broadcast("test-response",json.response);
				}
			}.bind(this));
		},
		destroyed() {
        	this.socket.disconnect();
		}
	}
</script>