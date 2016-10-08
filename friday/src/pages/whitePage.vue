<template>
	<cfunctionchecklogin>
		<csidebar current="white"></csidebar>
		<div class="fri-main">
			<cfunctionsummary :summary="summary"></cfunctionsummary>
			<cfunctionlist :list="list"></cfunctionlist>
		</div>
	</cfunctionchecklogin>
</template>
<script>
	export default {
		data () {
		  return {
            "list":[],
            "summary":[]
		  };
		}
	}
</script>