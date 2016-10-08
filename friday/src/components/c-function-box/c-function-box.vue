<!-- 标题嵌入框 -->
<style lang="sass">
  
</style>
<template> 
  <div class="fri-box">
    <div class="fri-box-title" v-if="name.trim().length > 0"><strong>{{ name }}</strong></div>
    <div class="fri-box-main">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import "../c-function-box/c-function-box.scss"
  export default{
    data () {
      return {
      };
    },
    props:{
      name:{
        type:String
      }
    },
    ready (){
    }
  }
</script>