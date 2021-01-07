import defineEl from "./utils/defineEl.js";
import reflow from "./utils/reflow.js";
import emulateTransitionEnd from "./utils/emulateTransitionEnd.js";
import callback from "./utils/callback.js";

class LoadingMask extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
                    <div>
                        <div class="spinner-border text-primary"></div>
                    </div>
                `;

        this.classList.add(
            "fade",
            "justify-content-center",
            "align-items-center"
        );
    }
}

defineEl("loading-mask", LoadingMask);

const loading = {
    el: null,
    cancelFn: null,
    cancel() {
        if (this.cancelFn) {
            this.cancel();
            this.cancelFn = null;
        }
    },
    show(cb) {
        if (this.el) return;

        this.el = document.createElement("loading-mask");
        
        this.cancel();
        document.body.appendChild(this.el);

        this.el.style.display = "flex";

        reflow(this.el);
        this.el.classList.add("show");
        emulateTransitionEnd(this.el, callback(cb));
    },
    hide(cb) {
        if (!this.el) return;

        this.cancel();
        this.el.classList.remove("show");

        emulateTransitionEnd(this.el, () => {
            this.el.style.display = "none";

            document.body.removeChild(this.el);

            this.el = null;
            
            callback(cb);
        });
    }
};

export default loading;