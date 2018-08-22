import Loading from "./loading";
import Vue from "vue";

const _Loading = Vue.extend(Loading);
let instance = null;

export default {
    show() {
        if (instance) return;
        let root = document.createElement("div");
        document.body.appendChild(root);
        instance = new _Loading();
        instance.$mount(root);
    },
    hide() {
        if (!instance) return;
        let el = instance.$el;
        let parent = el.parentNode;
        instance.$destroy();
        parent.removeChild(el);
        instance = null;
    }
}