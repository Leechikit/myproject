<!-- 代码生成页面 -->
<template>
	<cfunctionchecklogin>
		<csidebar current="build"></csidebar>
		<div class="fri-main">
			<cfunctionsummary :summary="summary"></cfunctionsummary>
			<cfunctionlist :list="list" :name="listname"></cfunctionlist>
		</div>
	</cfunctionchecklogin>
</template>
<script>
	export default {
		data () {
		  return {
            "listname":"框架列表",
            "list":[{
                "name": "piggy多线程框架",
                "desc": "用一键生成工具可以轻松生成指定代码，免去修改各个地方的烦恼。",
                "pic": "http://friday.yy.com/images/icon-buildserver.jpg",
                "path": "/buildServer"
            }],
            "summary":[{
                "title": "欢迎来到服务器代码生成"
            }]
		  };
		},
        ready() {

        }
	}
</script>
