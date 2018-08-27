import Vue from "vue";
import MessageBox from "./messageBox.vue";

const _MessageBox = Vue.extend(MessageBox);
let instance;

export default {
    show(options) {
        if (instance) return;
        let root = document.createElement("div");
        let mask = document.createElement("div");
        let body = document.body;
        let noop = () => {};
        options = options || {};
        instance = new _MessageBox({
            data() {
                return {
                    type: options.type,
                    msg: options.msg,
                    title: options.title || "提示"
                }
            },
            destroyed() {
                body.removeChild(mask);
                instance = null;
            },
            methods: {
                onOk: options.onOk || noop,
                onCancel: options.onCancel || noop,
                onShow: options.onShow || noop,
                onClose: options.onClose || noop
            }
        });
        mask.classList.add("modal-mask");
        body.appendChild(root);
        body.appendChild(mask);
        instance.$mount(root);
    },
    alert(msg, options) {
        this.show({
            msg,
            ...options,
            type: "alert",
            showCancel: false
        });
    },
    confirm(msg, onOk, options) {
        if (typeof onOk === "object") {
            options = onOk;
            onOk = null;
        }
        this.show({
            msg,
            onOk,
            ...options,
            type: "confirm"
        });
    },
    prompt(onOk, options) {
        if (typeof onOk === "object") {
            options = onOk;
            onOk = null;
        }
        this.show({
            onOk,
            ...options,
            type: "prompt"
        });
    }
}