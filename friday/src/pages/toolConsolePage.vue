<!-- 运维工具——console cmd页面 -->
<template>
    <cfunctionchecklogin>
        <csidebar current="tool"></csidebar>
        <div class="fri-main">
            <cfunctionsummary :summary="summary"></cfunctionsummary>
            <ctoolconsole :name="name"></ctoolconsole>
        </div>
    </cfunctionchecklogin>
</template>
<script>
    export default {
        data () {
          return {
            "summary":[{
                "title": "欢迎使用console cmd",
                "desc": "console cmd将帮助你对选定ip进程的控制台执行特定cmd命令，这在批量执行控制命令时非常有用。"
            }, {
                "title": "如何使用console cmd?",
                "desc": "曾经我们需要在多台机器上执行console cmd命令时，相当不便，甚至需要逐台机器登录去telnet执行，查看example快速入门："
            }],
            "name":"console cmd"
          };
        }
    }
</script>