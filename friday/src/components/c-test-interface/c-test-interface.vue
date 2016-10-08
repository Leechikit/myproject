<!-- 测试接口列表组件 -->
<style lang="sass">
	
</style>
<template>
    <div class="test-interface">
        <div class="test-item" v-for="item in list" v-on:click="createCase(item,$index)" v-bind:class="{'current':currClass[$index]}">
            <p class="interface_name">{{ item.item }}</p>
        </div>
        {{ list instanceof Array }}
        <div class="no-message" v-if="triggerInterface && list && list.length == 0">暂无测试接口</div>
    </div>
</template>
<script>
	import "../c-test-interface/c-test-interface.scss"

	export default {
		data () {
            return {
                "currClass":[]
            };
		},
        props:{
            list:{
                type:Array
            },
            triggerInterface:{
                type:Boolean
            }
        },
        methods:{
            createCase(item,index) {
                var msg = {
                    "interface_name":item.item,
                    "case":item.test_case || []
                }
                this.$dispatch("create-case",msg);
                if(this.currClass.indexOf(true) != -1){
                    this.currClass.$set(this.currClass.indexOf(true),false)
                }
                this.currClass.$set(index,true);
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
            }
        },
		ready(){
        }
	}
</script>
