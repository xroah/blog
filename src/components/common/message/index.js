import Message from "./message";
import Vue from "vue";

const DELAY = 3000;
let _Message = Vue.extend(Message);
let wrapper;

let message = {
    items: [],
    guid: 0,
    getWrapper() {
        if (!wrapper) {
            wrapper = document.createElement("div");
            wrapper.classList.add("message-wrapper");
            document.body.appendChild(wrapper);
        }
        return wrapper;
    },
    getParent() {
        let wrapper = this.getWrapper();
        let item = document.createElement("div");
        item.classList.add("item-wrapper");
        wrapper.appendChild(item);
        return item;
    },
    destroyInstance(ins, anim) {
        if (!(ins instanceof _Message)) ret
        let duration = anim ? 300 : 0; //getComputedStyle(el).getPropertyValue("animation-duration")
        let el = ins.$el.parentNode;
        if (ins.timer) {
            clearTimeout(ins.timer);
        }
        ins.$el.classList.add("leave");
        function _destroy() {
            ins.$destroy();
            el.parentNode.removeChild(el);
        }
        if (duration) {
            setTimeout(_destroy, duration);
        } else {
            _destroy();
        }
    },
    destroy(ins) {
        if (ins) {
            let index = this.items.findIndex(item => item.guid === ins.guid);
            this.items.splice(index, 1);
            this.destroyInstance(ins, true);
        } else {
            for (let item of this.items) {
                this.destroyInstance(item, false);
            }
            this.items = [];
        }
        /*  if (wrapper && !wrapper.children.length) {
             document.body.removeChild(wrapper);
             wrapper = null;
         } */
    },
    show(type, msg, delay = DELAY, callback) {
        let msgIns = new _Message({
            data() {
                return {
                    guid: this.guid++,
                    timer: null
                }
            },
            propsData: {
                type,
                text: msg
            }
        });
        let parent = this.getParent();
        let div = document.createElement("div");
        parent.appendChild(div);
        msgIns.$mount(div);
        this.items.push(msgIns);
        if (typeof callback === "function") {
            callback(msgIns);
        }
        msgIns.timer = setTimeout(() => {
            this.destroy(msgIns);
        }, delay);
        return msgIns;
    },
    success(msg, delay, callback) {
        this.show("success", msg, delay, callback);
    },
    error(msg, delay, callback) {
        this.show("error", msg, delay, callback);
    },
    info(msg, delay, callback) {
        this.show("info", msg, delay, callback)
    }
};

export default message;