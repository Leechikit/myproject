<!-- 代码生成——服务器代码生成页面 -->
<template>
    <cfunctionchecklogin>
        <csidebar current="build"></csidebar>
        <div class="fri-main">
            <cfunctionsummary :summary="summary"></cfunctionsummary>
            <cbuildserver :name="name"></cbuildserver>
        </div>
    </cfunctionchecklogin>
</template>
<script>
    export default {
        data () {
          return {
            "summary":[{
                "title": "欢迎使用服务器代码生成",
                "desc": "此前新写一个服务器进程需要复制黏贴老代码，删除代码，修改Makefile，很容易出错，现在，用一键生成工具可以轻松生成指定代码，免去修改各个地方的烦恼。"
            }, {
                "title": "如何使用服务器代码生成?",
                "desc": "在服务名栏目中填写S2S服务名字，默认类名和服务名相同，勾选需要添加的功能，如何ramcloud、metrics、db提交后即可下载生成的代码。"
            }],
            "name":"服务器代码生成"
          };
        },
        ready() {
        }
    }
</script>