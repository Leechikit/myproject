<!-- 测试用例列表组件 -->
<style lang="sass">
	
</style>
<template>
    <div class="test-case">
        <div class="btn btn-primary btn-addcase" v-on:click="createForm" v-if="triggerCase">新增测试用例</div>
        <div class="test-item" v-for="item in list" v-on:click="createForm(item,$index)" v-bind:class="{'current':currClass[$index]}">
            <p class="case_name">{{ item.name }}</p>
        </div>
        <div class="no-message" v-if="triggerCase && list instanceof Array && list.length == 0">暂无测试用例</div>
    </div>
</template>
<script>
	import "../c-test-case/c-test-case.scss"

	export default {
		data () {
            return {
                "currClass":[]
            };
		},
        props:{
            list:{},
            showForm:{
                type:Boolean
            },
            triggerCase:{
                type:Boolean
            }
        },
        methods:{
            createForm(item,index) {
                var msg = {};
                if(item.array && item.array.length > 0){
                    msg = {
                        "name":item.name,
                        "case":item.array
                    }
                    
                    if(this.currClass.indexOf(true) != -1){
                        this.currClass.$set(this.currClass.indexOf(true),false)
                    }
                    this.currClass.$set(index,true);
                }
                this.$dispatch("create-form",msg);
            },
            resetCurrClass() {
                this.list.forEach(function(item,index){
                    this.currClass.$set(index,false);
                }.bind(this))
            }
        },
        watch:{
            "list"() {
               this.list && this.resetCurrClass();
            },
            "showForm"(val) {
                !val  && this.resetCurrClass();
            }
        },
		ready(){

        }
	}
</script>
