import "../html/index.html"
import "../sass/index.scss"

import Vue from "vue"
import VueRouter from "vue-router"

import toolPage from "../pages/toolPage.vue"
import buildPage from "../pages/buildPage.vue"
import testPage from "../pages/testPage.vue"
import whitePage from "../pages/whitePage.vue"
import toolTailPage from "../pages/toolTailPage.vue"
import toolGrepPage from "../pages/toolGrepPage.vue"
import toolConsolePage from "../pages/toolConsolePage.vue"
import toolDoggyPage from "../pages/toolDoggyPage.vue"
import buildServerPage from "../pages/buildServerPage.vue"

Vue.use(VueRouter);

Vue.config.debug = true;
var App = Vue.extend({});

window.router = new VueRouter();
router.map({
    "/index":{
        component: toolPage
    },
    "/tool":{
        component: toolPage
    },
    "/build":{
        component: buildPage
    },
    "/test":{
        component: testPage
    },
    "/white":{
        component: whitePage
    },
    "/toolTail":{
        component: toolTailPage
    },
    "/toolGrep":{
        component: toolGrepPage
    },
    "/toolConsole":{
        component: toolConsolePage
    },
    "/toolDoggy": {
        component: toolDoggyPage
    },
    "/buildServer": {
        component: buildServerPage
    },
    "*": {
        component: toolPage
    }
})
router.start(App, "#fri");
