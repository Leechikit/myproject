<!-- 运维工具——distributed grep页面 -->
<template>
    <cfunctionchecklogin>
        <csidebar current="tool"></csidebar>
        <div class="fri-main">
            <cfunctionsummary :summary="summary"></cfunctionsummary>
            <ctoolgrep :name="name"></ctoolgrep>
        </div>
    </cfunctionchecklogin>
</template>
<script>
    export default {
        data () {
          return {
            "summary":[{
                "title": "欢迎使用distributed grep",
                "desc": "distributed grep 将帮助你同时grep数十台机器上的日志，简单输入进程名，即可一键分布式grep您想要的关键字"
            }, {
                "title": "如何使用distributed grep?",
                "desc": "指定daemon服务名,指定关键字,以及时间段，即可查询:"
            }],
            "name":"distributed grep"
          };
        }
    }
</script>