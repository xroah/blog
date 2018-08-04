import App from "./components/app";
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./components/router"
import "normalize.css";

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

new Vue({
    el: "#app",
    router,
    render: createElement => createElement(App)
});

