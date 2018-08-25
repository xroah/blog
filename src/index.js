import App from "./components/app";
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router";
import "normalize.css";
//quill eiditor's style should import globally
//quill editor's all content attribute are based on class names
import "quill/dist/quill.snow.css";
import "./components/common/editor/index.scss";
import Vuex from "vuex";
import modules from "./stores";

Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history",
    routes
});

Vue.use(Vuex);
const store = new Vuex.Store({
    modules
});

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});

//make :active work nomally on mobile phone
document.body.addEventListener("touchstart", () => {});
//for ios input, click out of input do not blur
document.addEventListener("touchend", evt => {
    let nodeName = evt.target.nodeName.toLowerCase();
    if (nodeName !== "input") {
        let activeEl = document.activeElement;
        if (activeEl.blur) activeEl.blur();
    }
});