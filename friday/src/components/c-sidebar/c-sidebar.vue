<!-- 侧边栏组件 -->
<style lang="sass">
	
</style>
<template>
    <aside class="fri-sidebar">
        <dl>
            <dt>
                <p class="mark"><i>F</i><i>R</i><i>I</i><i>D</i><i>A</i><i>Y</i></p>
                <p class="submark">—Alpha版</p></dt>
            <dd v-bind:class="{'active':item.id==current}" v-for="item in sidebarList">
            	<a v-link="'/'+item.id" title="{{ item.name }}">
            		<span v-bind:class="['glyphicon',item.className]"></span>{{ item.name }}
            	</a>
            </dd>
        </dl>
        <cfunctionlogin></cfunctionlogin>
    </aside>
</template>
<script>
	import "../c-sidebar/c-sidebar.scss"
	export default {
		data() {
			return {
                sidebarList:[
                    {
                        id:'tool',
                        name:'运维工具',
                        className:'glyphicon-th'
                    },
                    {
                        id:'build',
                        name:'代码生成',
                        className:'glyphicon-wrench'
                    },
                    {
                        id:'test',
                        name:'自动测试',
                        className:'glyphicon-tasks'
                    }/*,
                    {
                        id:'white',
                        name:'白名单',
                        className:'glyphicon-list-alt'
                    }*/
                ]
			}
		},
        props:{
            'current':{
                type:String,
                default:'tool'
            }
        },
		ready() {

		}
	}
</script>