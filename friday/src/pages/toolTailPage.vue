<!-- 运维工具——distributed tail页面 -->
<template>
    <cfunctionchecklogin>
        <csidebar current="tool"></csidebar>
        <div class="fri-main">
            <cfunctionsummary :summary="summary"></cfunctionsummary>
            <ctooltail :name="name"></ctooltail>
        </div>
    </cfunctionchecklogin>
</template>
<script>
    export default {
        data () {
          return {
            "summary":[{
                "title": "欢迎使用distributed tail",
                "desc": "distributed tail 将帮助你同时tail数十台机器上的日志，简单输入进程名，即可并行tail多台机器。"
            }, {
                "title": "如何使用distributed tail?",
                "desc": "指定daemon服务名,选择需要查询的ip,您甚至可以像本地使用tail一样在末尾添加命令,如 |grep -E \"a|b|x\"| awk -F \"{print $1}\""
            }],
            "name":"distributed tail"
          };
        }
    }
</script>