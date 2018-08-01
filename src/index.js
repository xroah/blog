import App from "./components/app";
import Vue from "vue";
import "normalize.css";
import "./index.scss";

new Vue({
    el: "#app",
    render: createElement => createElement(App)
});

