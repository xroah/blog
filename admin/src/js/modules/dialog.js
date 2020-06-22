import emulateTransitionEnd from "./utils/emulateTransitionEnd.js";
import reflow from "./utils/reflow.js";

const modalContent = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer"></div>
        </div>
    </div>
`;

let uuid = 0;

class Modal {
    options = {
        cancel: true,
        ok: true,
        okText: "确定",
        cancelText: "取消",
        title: "提示",
        delay: 0,
        content: "",
        showClose: true,
        center: false,
        onOk: () => { },
        onCancel: () => { },
        onClose: () => { }
    };
    uuid = uuid++;
    buttons = [];
    el = document.createElement("div");
    backdrop = document.createElement("div");

    constructor(options = {}) {
        this.options = {
            ...this.options,
            ...options
        }
        this.el.innerHTML = modalContent;
        this.el.classList.add("modal", "bs-dialog", "fade");
        this.backdrop.classList.add("modal-backdrop", "fade");
        this.init();
    }

    init() {
        const {
            title,
            ok,
            cancel,
            cancelText,
            okText,
            content,
            center,
            showClose
        } = this.options;
        const headerEl = this.el.querySelector(".modal-header");
        const dialogEl = this.el.querySelector(".modal-dialog");
        const titleEl = this.el.querySelector(".modal-title");
        const bodyEl = this.el.querySelector(".modal-body");
        const footerEl = this.el.querySelector(".modal-footer");
        const closeBtn = document.createElement("button");
        const cancelBtn = document.createElement("button");
        const okBtn = document.createElement("button");

        titleEl.innerHTML = title || "";
        bodyEl.innerHTML = content || "";

        if (center) {
            dialogEl.classList.add("modal-dialog-centered");
        }

        if (showClose) {
            closeBtn.innerHTML = "&times;";

            closeBtn.classList.add("close");
            headerEl.appendChild(closeBtn);
            closeBtn.addEventListener("click", this.hide);
            this.buttons.push({
                btn: closeBtn,
                handler: this.hide
            });
        }

        if (ok) {
            okBtn.innerHTML = okText;

            okBtn.classList.add("btn", "btn-primary");
            okBtn.addEventListener("click", this.onOk);
            footerEl.appendChild(okBtn);
            this.buttons.push({
                btn: okBtn,
                handler: this.onOk
            });
        }

        if (cancel) {
            cancelBtn.innerHTML = cancelText;

            cancelBtn.classList.add("btn", "btn-light");
            cancelBtn.addEventListener("click", this.onCancel);
            footerEl.appendChild(cancelBtn);
            this.buttons.push({
                btn: cancelBtn,
                handler: this.onCancel
            });
        }

        document.body.appendChild(this.el);
        document.body.appendChild(this.backdrop);
    }

    show = () => {
        if (this.el.classList.contains("show")) return;

        reflow(this.backdrop);
        this.backdrop.classList.add("show");

        this.el.style.display = "block";
        reflow(this.el);
        this.el.classList.add("show");
    }

    hide = () => {
        if (!this.el.classList.contains("show")) return;

        for (let obj of this.buttons) {
            obj.btn.removeEventListener("click", obj.handler);
        }

        this.backdrop.classList.remove("show");
        this.el.classList.remove("show");

        emulateTransitionEnd(this.backdrop, () => {
            document.body.removeChild(this.backdrop);
        });
        emulateTransitionEnd(this.el, () => {
            document.body.removeChild(this.el);
            this.options.onClose();
        });
    }

    onOk = () => {
        const { onOk } = this.options;
        const ret = onOk.call(this);

        //promise
        if (ret && ret.then && ret.catch) {
            ret.then(this.hide)
                .catch(() => { });
        } else if (ret !== false) {
            this.hide();
        }
    }

    onCancel = () => {
        const { onCancel } = this.options;

        onCancel();
        this.hide();
    }
}

const modals = new Map();
window.modals = modals;

function factory(config = {}) {
    return (message, options) => {
        let _options = {};

        if (typeof message === "object") {
            _options = message;
        } else {
            _options = {
                content: message,
                ...options
            };
        }

        const onClose = _options.onClose || (() => { });
        const modal = new Modal({
            ..._options,
            ...config,
            onClose() {
                onClose();
                modals.delete(modal.uuid);
            }
        });

        modal.show();
        modals.set(modal.uuid, modal);

        return {
            close: modal.hide
        };;
    };
}

export default {
    destroy() {
        if (!modal.size) return;

        for (let [id, modal] of modals) {
            document.body.removeChild(modal.el);
            document.body.removeChild(modal.backdrop);
        }

        modals.clear();
    },
    alert: factory({ cancel: false }),
    confirm: factory()
}
