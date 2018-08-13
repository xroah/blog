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
        let showCancel = options.showCancel;
        instance = new _MessageBox({
            data() {
                return {
                    showCancel: showCancel === undefined ? true : showCancel,
                    msg: options.msg
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
            ...options,
            msg,
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
            ...options
        });
    }
}