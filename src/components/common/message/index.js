import Message from "./message";
import Vue from "vue";

const DELAY = 3; //default delay(s)
//interval between two items when items dismiss
//prevent the items from dismissing too fast
//make sure first item can back to top
const INTERVAL = 300;
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
        if (!(ins instanceof _Message)) return;
        //.3s, default duration
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
            //destroy after animation finished
            setTimeout(_destroy, duration);
        } else {
            _destroy();
        }
    },
    destroy(ins) {
        let {
            items
        } = this;
        if (ins) {
            let index = items.findIndex(item => item.guid === ins.guid);
            items.splice(index, 1);
            this.destroyInstance(ins, true);
        } else {
            for (let item of items) {
                this.destroyInstance(item, false);
            }
            this.items = [];
        }
        /*  if (wrapper && !wrapper.children.length) {
             document.body.removeChild(wrapper);
             wrapper = null;
         } */
    },
    show(type, msg, delay = DELAY, onClose) {
        let {
            items
        } = this;
        let len = items.length;
        if (typeof delay === "function") {
            //third param is a function
            onClose = delay;
            delay = DELAY;
        }
        delay *= 1000;
        if (len) {
            let prevDelay = items[len - 1].delay;
            let itvl = delay - prevDelay;
            //buffer time,make sure items back to top
            //if user click too fast, the items will dismiss in a flash
            if (itvl <= 0 && Math.abs(itvl) >= INTERVAL) {
                delay = prevDelay + INTERVAL;
            } else if (itvl < INTERVAL) {
                delay += INTERVAL;
            }
        }
        let msgIns = new _Message({
            data() {
                return {
                    guid: this.guid++,
                    timer: null,
                    delay,
                    type,
                    msg
                }
            },
            destroyed() {
                if (typeof onClose === "function") {
                    onClose();
                }
            }
        });
        let parent = this.getParent();
        let mountDiv = document.createElement("div");
        this.items.push(msgIns);
        parent.appendChild(mountDiv);
        msgIns.$mount(mountDiv); //div will be replaced by the vue component
        msgIns.timer = setTimeout(() => {
            this.destroy(msgIns, onClose);
        }, delay);
        return msgIns;
    },
    success(msg, delay, onClose) {
        return this.show("success", msg, delay, onClose);
    },
    error(msg, delay, onClose) {
        return this.show("error", msg, delay, onClose);
    },
    info(msg, delay, onClose) {
        return this.show("info", msg, delay, onClose)
    }
};

export default message;