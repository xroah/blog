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

    show(cb) {
        if (this.el.classList.contains("show")) return;

        this.el.style.display = "block";

        reflow(this.el);
        this.el.classList.add("show");

        emulateTransitionEnd(this.el, callback(cb), this.delay);
    }

    hide(cb) {
        if (!this.el.classList.contains("show")) return;

        this.el.classList.remove("show");
        emulateTransitionEnd(this.el, () => {
            this.el.style.display = "none";

            if (this.el.parentNode === wrapper) {
                wrapper.removeChild(this.el);
            }
            callback(cb);
        }, this.delay);
    }
}

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

        timer = setTimeout(msg.hide.bind(msg), 3000);

        return {
            hide() {
                clearTimeout(timer);
                msg.hide();
            }
        }
    }
}

export default {
    info: factory("info"),
    success: factory("info"),
    error: factory("danger"),
    destroy() {
        const children = wrapper.children;

        for (let child of children) {
            if (child.parentNode === wrapper) {
                wrapper.removeChild(child);
            }
        }
    }
}