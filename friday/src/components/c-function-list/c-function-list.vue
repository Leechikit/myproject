<!-- 功能列表组件 -->
<style lang="sass">
	
</style>
<template>
    <div class="fri-list">
        <div class="title"><strong>{{ name }}</strong></div>
        <ul class="clearfix">
            <li class="fri-item col-sm-4" v-for=" item in list ">
                <a class="content" title="{{ item.name }}" href="javascript:" v-on:click="jumpTo(item.path)">
                    <div class="img" v-if="item.pic">
                        <img v-bind:src="item.pic" alt="{{ item.name }}"/>
                    </div>
                    <div class="summary">
                        <p class="name">{{ item.name }}</p>
                        <p class="desc">{{ item.desc }}</p>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
	import "../c-function-list/c-function-list.scss"
    import checkLoginStatus from "../../js/util/checkLoginStatus.js"

	export default {
		data () {
		  return {

		  };
		},
        props:{
            'list':{
                type:Array,
                required:true
            },
            'name':{}
        },
        methods:{
            jumpTo(path) {
                checkLoginStatus(function(){
                    router.go(path);
                },true)
            }
        },
		ready(){
         
		}
	}
</script>