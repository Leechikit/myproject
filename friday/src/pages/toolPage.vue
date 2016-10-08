<!-- 运维工具页面 -->
<template>
	<cfunctionchecklogin>
        <csidebar current="tool"></csidebar>
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
            "listname":"运维工具",
            "list":[{
                "name": "distributed tail",
                "desc": "帮助你同时tail数十台机器上的日志，简单输入进程名，即可并行tail多台机器。",
                "pic": "http://friday.yy.com/images/icon-tooltail.jpg",
                "path": "/toolTail"
            }, {
                "name": "distributed grep",
                "desc": "帮助你同时grep数十台机器上的日志，简单输入进程名，即可一键分布式grep您想要的关键字",
                "pic": "http://friday.yy.com/images/icon-toolgrep.jpg",
                "path": "/toolGrep"
            }, {
                "name": "console cmd",
                "desc": "帮助你对选定ip进程的控制台执行特定cmd命令，这在批量执行控制命令时非常有用。",
                "pic": "http://friday.yy.com/images/icon-toolcmd.jpg",
                "path": "/toolConsole"
            }, {
                "name": "doggy",
                "desc": "帮助你在网络接收层做协议分析与查找，用来定位协议是否被发送或者接收,是Google Dapper分布式跟踪的一个实现。",
                "pic": "http://friday.yy.com/images/icon-tooldoggy.jpg",
                "path": "/toolDoggy"
            } ],
            "summary":[
                {
                    "title":"欢迎使用 运维工具",
                    "desc":"这里收集了一系列常用工具用于提高运维效率。"
                },{
                    "title":"点击工具查看详情"
                }
            ]
		  };
		},
        ready() {
            
        }
	}
</script>