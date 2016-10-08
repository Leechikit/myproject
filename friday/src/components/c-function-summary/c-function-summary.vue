<!-- 功能描述区域 -->
<style lang="sass">
	
</style>
<template> 
	<div class="fri-summary">
		<div class="section" v-for="item in summary">
			<h3>{{ item.title }}</h3>
			<p>{{ item.desc }}<a v-if="item.link" href="{{ item.link.url }}" target="_blank"><strong>{{ item.link.name }}</strong></a></p>
		</div>
		<!-- <div class="section">
			<h3>是不是需要一个服务?</h3>
			<p>可以从这里了解如何创建一个数据库服务: <a href="http://docs.daocloud.io/daocloud-services/mysql" target="_blank"><strong>创建MySQL</strong></a>
		</div> -->
	</div>
</template>
<script>
	import "../c-function-summary/c-function-summary.scss";
	export default {
		data () {
		  return {
		  };
		},
		props:{
            'summary':{
                type:Array,
                required:true
            }
        },
		ready (){

		}
	}
</script>