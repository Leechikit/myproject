var loginCfg = {
  loginCallBack: null,
  logoutCallBack: null,
  closeLoginCallBack: null
};
loginCfg.loginCallBack = function() {
  window.location.reload();
};
loginCfg.logoutCallBack = function() {
  window.location.reload();
};
/**
 * 弹出登录窗口
 */
function showLoginBox() {
  //  UDB.sdk.QLogin.ajaxOpenWithSaveToken('/concert/getSdkAuth.action');
  UDB.sdk.PCWeb.popupOpenLgn('/admin/udb/getSdkAuth');
}

/**
 * 登录后刷新的相关操作
 * @return
 */
function refreshOperate(cancel, writeCookieURL) {
  if (cancel == "1") {
    if (loginCfg.closeLoginCallBack) {
      loginCfg.closeLoginCallBack();
      return false;
    }
  } else {
    //    UDB.sdk.QLogin.writeCrossmainCookieWithCallBack(writeCookieURL,function(){
    UDB.sdk.PCWeb.writeCrossmainCookieWithCallBack(writeCookieURL, function() {
      $(this).unbind("load"); //解决udb加载事件重复绑定的bug
      showLoginInfo();
      if (loginCfg.loginCallBack) {
        loginCfg.loginCallBack();
      }
    });
  }
}

// 登录成功后，公共回调方法处理
function showLoginInfo() {
  initLoginStatus();
}

// 初始化用户昵称
function initUserNick() {
  $.ajax({
    url: 'http://www.yy.com/yyweb/user/queryUserInfo.json',
    type: 'GET',
    dataType: 'jsonp'
  })
  .done(function(json) {
    var data = json.data,
      headPic = data.logo,
      userName = data.nick,
      userUid = data.uid;

      $('#user-head-pic').attr('src', headPic);
      $('#loginBox .user-name').text(userName);
      $('.homePage > a').eq(0).attr('href',"http://www.yy.com/u/"+userUid);
      $('.userSet > a').eq(0).attr('href',"http://www.yy.com/u/account/"+userUid);
  });
}

// 初始化用户登录态
function initLoginStatus() {
  var error = false;
  try {
    var logined = isLogin();
    if (logined) { //已登录
      initUserNick();
      $('#noLoginBox,#loginBox').hide();
      $('#loginBox').show();
    } else { //未登录
      $('#noLoginBox,#loginBox').hide();
      $('#noLoginBox').show();
    }
  } catch (e) {
    error = true;
  }
}

// 退出登录
function logout() {
  $.ajax({
    url: "/admin/udb/logout.action",
    type: "get",
    dataType: "json",
    success: function(json) {
      initLoginStatus();
      UDB.sdk.PCWeb.deleteCrossmainCookieWithCallBack(json.deleteCookieURL, function() {
        if (loginCfg.logoutCallBack) {
          loginCfg.logoutCallBack();
        }
      });
    }
  });
}

function isLogin() {
  var flag = false;
  var yyuid = $.cookie('yyuid');
  if (yyuid && yyuid != '') {
    flag = true;
  }
  return flag;
}

function getLoginUserName() {
  return $.cookie('username');
}

function getLoginUid() {
  if ($.cookie('yyuid')) {
    return $.cookie('yyuid');
  }
  return 0;
}

//获取用户昵称，匿名或者实名的
function getUserName() {
  var loginname = window._usernick;
  if (loginname) {
    return loginname;
  }
  return "YY网友";
}
