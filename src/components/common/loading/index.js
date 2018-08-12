import Loading from "./loading";
import Vue from "vue";

const _Loading = Vue.extend(Loading);

export default {
    instance: null,
    show() {
        let root = document.createElement("div");
        document.body.appendChild(root);
        this.instance = new _Loading();
        this.instance.$mount(root);
    },
    hide() {
        let { instance } = this;
        if (!instance) return;
        let el = instance.$el;
        let parent = el.parentNode;
        instance.$destroy();
        parent.removeChild(el);
        instance = null;
    }
}