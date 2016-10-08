<!-- 确认弹出框 -->
<style lang="sass">
	
</style>
<template> 
	<div class="fri-confirm">
		<div class="confirm-content">
			<p>确认要执行这些命令吗？如果确定，</p>
			<p>请输入 {{ number1 }} + {{ number2 }}=<input type="text" name="" id="cfResult" v-model="inputResult">？</p>
		</div>
		<div class="confirm-error" v-show="showError">验证错误，请输入正确的运算结果！</div>
		<div class="confirm-btn">
			<span class="cancel btn btn-primary" v-on:click="cancel">取消</span>
			<span class="ensure btn btn-primary" v-on:click="ensure">确认</span>
		</div>
	</div>
	<div class="fri-mask"></div>
</template>
<script>
	import "../c-function-confirm/c-function-confirm.scss";
	export default {
		data () {
		  return {
		  	randomStart:1,
		  	randomEnd:10,
		  	showError:false,
		  	inputResult:null
		  };
		},
		computed:{
			number1:function(){
				return Math.floor(Math.random()*(this.randomEnd - this.randomStart)+this.randomStart);
			},
			number2:function(){
				return Math.floor(Math.random()*(this.randomEnd - this.randomStart)+this.randomStart);
			},
			plusResult:function(){
				return this.number1 + this.number2;
			}
		},
        methods:{
        	cancel:function(){
        		this.$dispatch('confirm-result',false);
        	},
        	ensure:function(){
        		if(this.inputResult == this.plusResult){
        			this.showError = false;
        			this.$dispatch('confirm-result',true);
        		}else{
        			this.showError = true;
        		}
        	}
        },
		ready (){
			
		}
	}
</script>