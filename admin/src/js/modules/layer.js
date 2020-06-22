import defineEl from "./utils/defineEl.js";
import emulateTransitionEnd from "./utils/emulateTransitionEnd.js";
import reflow from "./utils/reflow.js";
import request from "./request.js";
import message from "./message.js";

class LayerComp extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.visible = false;
        this.hide = this.hide.bind(this);

        request("/templates/layer.html")
            .then(this.init.bind(this));
    }

    init(res) {
        this.initiated = true;
        this.shadowRoot.innerHTML = res;

        const close = this.shadowRoot.querySelector(".close-layer");

        close.addEventListener("click", this.hide);
    }

    disconnectedCallback() {
        const close = this.shadowRoot.querySelector(".close-layer");

        close.removeEventListener("click", this.hide);
    }

    hide() {
        this.setVisible(false);
    }

    setVisible(visible, onShown, onHidden) {
        if (!this.initiated) {
            message.destroy();

            return message.error("组件还为加载完成，请稍候");
        }

        const el = this.shadowRoot.querySelector(".layer");

        if (this.visible === visible) return;

        this.visible = visible;

        if (visible) {
            el.style.display = "flex";

            reflow(el);
            el.classList.add("show");
        } else {
            el.classList.remove("show");
        }

        emulateTransitionEnd(el, () => {
            if (visible) {
                if (typeof onShown === "function") onShown();
            } else {
                el.style.display = "none";

                if (typeof onHidden === "function") onHidden();
            }
        });
    }
}

defineEl("layer-comp", LayerComp);