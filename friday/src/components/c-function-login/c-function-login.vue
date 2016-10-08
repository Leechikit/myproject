<!-- 登录组件 -->
<style lang="sass">
  
</style>
<template> 
  <div class="fri-login">
    <div id="noLoginBox">
          <a id="loginId" href="javascript:void(0)">登录</a>
          <span class="line">|</span> 
          <a id="registered" target="_blank" href="https://aq.yy.com/p/reg/account.do?appid=11">注册</a>
    </div>
    <div id="loginBox">
      <div class="headPic">
        <img id="user-head-pic">
      </div>
      <div class="info-popupbox">
        <a href="javascript:void(0)" id="loginOut">退出</a>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import "./c-function-login.scss"

  export default{
    data () {
      return {
      };
    },
    ready (){
      function initLogin() {
        loginCfg.loginCallBack = function() {
          window.location.reload();
        };
        loginCfg.logoutCallBack = function() {
          window.location.reload();
        };
        self.parent.loginSuccess = function(){
          window.location.reload();
        }

        //显示登录的状态
        initLoginStatus();
      }
      function eventBind() {
        $('#loginId').on('click', function(event) {
          showLoginBox();
        });

        $('#loginOut').on('click', function(event) {
          logout();
        });
      }
      initLogin();
      eventBind();
    }
  }
</script>