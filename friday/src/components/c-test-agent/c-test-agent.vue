<!-- agent列表组件 -->
<style lang="sass">
	
</style>
<template>
    <div class="test-agent">
        <ul class="clearfix" v-if="agentData.result == 'ok'">
            <li class="test-item col-sm-6" v-for=" item in list " v-bind:class="{'current':currClass[$index]}">
                <div class="content">
                    <p class="test-host">{{ item.host }}</p>
                    <div class="input-group">
                        <label class="glyphicon input-group-addon" for="svcName">port</label>
                        <input type="text" class="form-control" name="" placeholder="输入端口" v-model="item.port" v-on:keyup="onlyNumber" v-on:afterpaste="onlyNumber" v-bind:class="{'s-error':errorClass[$index]}">
                    </div>
                    <div class="button copy-btn" v-on:click="createInterFace(item,$index)">GO</div>
                </div>
            </li>
        </ul>
        <div class="no-message" v-if="agentData.result == 'ok' && list.length == 0">暂无agent</div>
        <div class="no-message" v-if="agentData.result == 'error'">
            {{ errorTip }}
            <pre>
                <span class="text">{{ errorCommand }}</span>
                <span class="copy-btn" data-clipboard-text="{{ errorCommand }}" data-toggle="tooltip" data-placement="right" data-original-title="{{ copyTips }}" v-on:mouseenter="showCopyTips" v-on:mouseleave="hideCopyTips"><svg aria-hidden="true" class="octicon octicon-clippy" height="16" version="1.1" viewBox="0 0 14 16" width="14" fill="#708298"><path d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path></svg></span>
            </pre>
        </div>
    </div>
</template>
<script>
	import "../c-test-agent/c-test-agent.scss"
    import Clipboard from 'clipboard'

	export default {
		data () {
            return {
                "currClass":[],
                "errorClass":[],
                "list":[],
                "errorTip":"",
                "errorCommand":"",
                'copyTips':'Copy'
            };
		},
        props:{
            "agentData":{
                type:Object,
                required:true
            }
        },
        events:{
            "agent-error"(bol){
                this.errorClass.$set(this.currClass.indexOf(true),!bol);
            }
        },
        methods:{
            createInterFace(item,index) {
                if(item.port&&item.port.trim().length > 0){
                    var msg = {
                        "host":item.host,
                        "port":item.port
                    };
                    this.$dispatch("create-interface",msg);
                    if(this.currClass.indexOf(true) != -1){
                        this.currClass.$set(this.currClass.indexOf(true),false)
                    }
                    this.currClass.$set(index,true);
                }
            },
            onlyNumber(event) {
                event.target.value = event.target.value.replace(/\D/g,'')
            },
            resetCurrClass() {
                this.list.forEach(function(item,index){
                    this.currClass.$set(index,false);
                    this.errorClass.$set(index,false);
                }.bind(this))
            },
            showCopyTips:function(event){
                $(event.target).tooltip('show');
            },
            hideCopyTips:function(event){
                $(event.target).tooltip('hide');
                this.copyTips = 'Copy';    
            }
        },
        watch:{
            "list"() {
               this.resetCurrClass();
            },
            "agentData"() {
                if(this.agentData.result == "ok"){
                    this.list = this.agentData.agents;
                }else if(this.agentData.result == "error"){
                    this.errorTip = this.agentData.tip;
                    this.errorCommand = this.agentData.command + " " + window.getLoginUserName();
                }
            }
        },
		ready(){
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
