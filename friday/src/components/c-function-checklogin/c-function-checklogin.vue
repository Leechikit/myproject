<!-- 登录后显示页面内容 -->
<style lang="sass">
  
</style>
<template> 
  <div class="fri-container" v-if="isLogin">
      <slot></slot>
  </div>
</template>
<script>
    import checkLoginStatus from "../../js/util/checkLoginStatus.js"

    export default {
        data () {
          return {
            "isLogin":false,
          };
        },
        ready() {
            checkLoginStatus(function(){
                this.isLogin = true;
            }.bind(this),true);
        }
    }
</script>