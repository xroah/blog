import emulateTransitionEnd from "./utils/emulateTransitionEnd.js";
import reflow from "./utils/reflow.js";
import callback from "./utils/callback.js";

let uuid = 0;
let wrapper = document.createElement("div");

class Message {
    constructor(type) {
        this.delay = 150;
        this.uuid = uuid++;
        this.el = document.createElement("div");

        this.el.classList.add("alert", `alert-${type}`);
        wrapper.appendChild(this.el);
    }

    show = (cb) => {
        if (this.el.classList.contains("show")) return;

        this.el.style.display = "block";

        reflow(this.el);
        this.el.classList.add("show");

        emulateTransitionEnd(this.el, callback(cb), this.delay);
    }

    hide = (cb) => {
        if (!this.el.classList.contains("show")) return;

        this.el.classList.remove("show");
        emulateTransitionEnd(this.el, () => {
            this.el.style.display = "none";

            remove(this.el);
            callback(cb)();
        }, this.delay);
    }
}

function remove(el) {
    if (el.parentNode === wrapper) {
        wrapper.removeChild(el);
    }
}

const messages = new Map();

function factory(type) {
    return (message = "", cb) => {
        if (!wrapper.parentNode) {
            wrapper.classList.add("message-wrapper");
            document.body.appendChild(wrapper);
        }

        const msg = new Message(type);
        let timer = null;

        msg.el.innerHTML = message;

        msg.show(cb);
        messages.set(msg.uuid, msg);

        timer = setTimeout(() => {
            msg.hide(() => {
                messages.delete(msg.uuid);
            });
        }, 3000);

        return {
            hide(cb) {
                clearTimeout(timer);
                msg.hide(cb);
                messages.delete(msg.uuid);
            }
        }
    }
}

export default {
    info: factory("info"),
    success: factory("info"),
    error: factory("danger"),
    destroy() {
        for (let [id, msg] of messages) {
            remove(msg.el);
        }

        messages.clear();
    }
}