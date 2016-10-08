<!-- 功能展示区域 -->
<style lang="sass">
  
</style>
<template> 
  <div class="fri-info">
    <div class="fri-info-title" v-if="name&&name.trim().length > 0"><strong>{{ name }}</strong></div>
    <div class="fri-info-main" v-bind:class="{'fri-flexbox':flexbox}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import "../c-function-info/c-function-info.scss"
  export default{
    data () {
      return {
      };
    },
    props:{
      name:{
        type:String
      },
      flexbox:{}
    },
    ready (){
    }
  }
</script>