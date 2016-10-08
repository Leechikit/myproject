<!-- 测试用例表单组件 -->
<style lang="sass">
	
</style>
<template>
    <div class="test-form">
        <div class="test-main">
            <div class="test-table" v-show="!showResult">
                <p class="title">
                    <span class="interface">{{ current.interface }}</span>
                    <span class="agent">[<span class="host">{{ current.host }}</span>:<span class="port">{{ current.port }}</span>]</span>
                </p>
                <label for="functionName" class="request">测试用例名<span class="error-tips" v-show="validate.function_name_error">不能为空！</span></label>
                <div class="box">
                    <input type="text" class="form-control" id="functionName" name="function_name" placeholder="" v-model="args.function_name">
                </div>
                <label class="request">参数<span class="error-tips" v-show="validate.case_error">不能为空！</span></label>
                <div class="box-list">
                    <div class="box" v-for="item in args.case" track-by="$index">
                        <div class="dropdown">
                          <button class="btn btn-default dropdown-toggle" id="dLabe{{ $index }}" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ item.type }}
                           <span class="caret"></span>
                          </button>
                          <ul class="dropdown-menu" role="menu" aria-labelledby="dLabe{{ $index }}">
                            <li role="presentation" v-for="option in selectOptions"><a role="menuitem" tabindex="-1" href="javascript:" v-on:click="selectType(item,option)">{{ option }}</a></li>
                          </ul>
                        </div>
                        <input type="text" class="form-control" name="case_value" placeholder="" v-on:change="changeValue(item)" v-on:keyup="onlyNumber(item.type)" v-on:afterpaste="onlyNumber(item.type)" value="{{ item.type == 'map' ? '0' : item.value }}" disabled="{{ item.type == 'map' }}">
                        <div class="btn-deletecase" v-on:click="deleteCase($index)" data-toggle="tooltip" data-placement="right" data-original-title="delete" v-on:mouseenter="showCopyTips" v-on:mouseleave="hideCopyTips">×</div>

                    </div>
                    <button class="btn btn-primary btn-add" v-on:click="addCase">add</button>
                </div>
                <div class="clearfix">
                    <button class="btn btn-primary btn-submit" v-on:click="submit">提交</button>
                </div>
            </div>
            <div class="test-result" v-show="showResult">
                <p class="response">{{ response }}</p>
                <div class="clearfix">
                    <button class="btn btn-primary btn-back" v-on:click="back">返回</button>
                </div>
            </div>
        </div>
        <span class="btn-delete" v-on:click="deleteForm">×</span>
    </div>
    <div class="test-mask"></div>
</template>
<script>
	import "../c-test-form/c-test-form.scss"
    import http from "../../js/util/http.js"

	export default {
		data () {
            return {
                "args":{
                    "function_name":"",
                    "case":[{
                        "type":"int",
                        "value":""
                    }]
                },
                "validate":{
                    "function_name_error":false,
                    "case_error":false
                },
                "selectOptions":["int","string","map"],
                "showResult":false,
                "response":null
            };
		},
        props:{
            "msg":{
                type:Object
            },
            "current":{
                type:Object
            }
        },
        methods:{
            addCase() {
                this.args.case.push({
                    "type":"int",
                    "value":""
                });
            },
            deleteCase(index) {
                this.args.case.$remove(this.args.case[index]);
            },
            selectType(item,type) {
                item.type = type;
                if(type == "map"){
                    item.value = "0";
                }
            },
            changeValue(item) {
                item.value = event.target.value;
            },
            submit(event) {
                var case_error = false;
                
                if(!this.args.function_name.trim()){
                    this.validate.function_name_error = true;
                }else if(case_error){
                    this.validate.case_error = true;
                }else{
                    var data = {
                        "host":this.current.host,
                        "port":this.current.port,
                        "function_name":this.args.function_name,
                        "case":this.args.case
                    }
                    
                    this.$dispatch("commit-case",data);
                    // this.$dispatch("create-interface",data);
                    for(var i in this.validate){
                        this.validate[i] = false;
                    }
                }
            },
            deleteForm() {
                this.$dispatch("delete-form");
            },
            onlyNumber(type) {
                if(type == "init"){
                    event.target.value = event.target.value.replace(/\D/g,'');
                }
            },
            showCopyTips(event){
                $(event.target).tooltip('show');
            },
            hideCopyTips(event){
                $(event.target).tooltip('hide');   
            },
            back(event) {
                this.response = null;
                this.showResult = false;
            }
        },
        events:{
            "test-response"(msg) {
                this.response = msg;
                this.showResult = true;
            }
        },
		ready(){
            if(this.msg.name){
                this.args.function_name = this.msg.name;
            }
            if(this.msg.case){
                this.args.case = this.msg.case;
            }
		}
	}
</script>
