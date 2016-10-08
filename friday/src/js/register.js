import Vue from "vue"

// 注册全局组件
import Csidebar from "../components/c-sidebar/c-sidebar.vue"
import CfunctionList from "../components/c-function-list/c-function-list.vue"
import CfunctionInfo from "../components/c-function-info/c-function-info.vue"
import CfunctionSummary from "../components/c-function-summary/c-function-summary.vue"
import CfunctionLog from "../components/c-function-log/c-function-log.vue"
import CfunctionConfirm from "../components/c-function-confirm/c-function-confirm.vue"
import CfunctionDownload from "../components/c-function-download/c-function-download.vue"
import CfunctionLogin from "../components/c-function-login/c-function-login.vue"
import CfunctionBox from "../components/c-function-box/c-function-box.vue"
import CfunctionCheckLogin from "../components/c-function-checklogin/c-function-checklogin.vue"
import CtoolTail from "../components/c-tool-tail/c-tool-tail.vue"
import CtoolGrep from "../components/c-tool-grep/c-tool-grep.vue"
import CtoolConsole from "../components/c-tool-console/c-tool-console.vue"
import CtoolDoggy from "../components/c-tool-doggy/c-tool-doggy.vue"
import CbuildServer from "../components/c-build-server/c-build-server.vue"
import CtestAgent from "../components/c-test-agent/c-test-agent.vue"
import CtestForm from "../components/c-test-form/c-test-form.vue"
import CtestCase from "../components/c-test-case/c-test-case.vue"
import CtestInterface from "../components/c-test-interface/c-test-interface.vue"

Vue.component("csidebar", Csidebar);
Vue.component("cfunctionlist", CfunctionList);
Vue.component("cfunctioninfo", CfunctionInfo);
Vue.component("cfunctionsummary", CfunctionSummary);
Vue.component("cfunctionlog", CfunctionLog);
Vue.component("cfunctionconfirm", CfunctionConfirm);
Vue.component("cfunctiondownload", CfunctionDownload);
Vue.component("cfunctionlogin", CfunctionLogin);
Vue.component("cfunctionbox", CfunctionBox);
Vue.component("cfunctionchecklogin", CfunctionCheckLogin);
Vue.component("ctooltail", CtoolTail);
Vue.component("ctoolgrep", CtoolGrep);
Vue.component("ctoolconsole", CtoolConsole);
Vue.component("ctooldoggy", CtoolDoggy);
Vue.component("cbuildserver", CbuildServer);
Vue.component("ctestagent", CtestAgent);
Vue.component("ctestform", CtestForm);
Vue.component("ctestcase", CtestCase);
Vue.component("ctestinterface", CtestInterface);

// 注册全局过滤器
Vue.filter("number", function(value){
	return Number(value);
})