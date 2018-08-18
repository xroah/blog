import App from "./components/app";
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./components/router"
import "normalize.css";
//quill eiditor's style should import globally
//quill editor's content all attribute are based on class names
import "quill/dist/quill.snow.css";
import "./components/common/editor/index.scss";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes
});

new Vue({
    el: "#app",
    router,
    render: createElement => createElement(App)
});

//make :active work nomally on mobile phone
document.body.addEventListener("touchstart", () => {});