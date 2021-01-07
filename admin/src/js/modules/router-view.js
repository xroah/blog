import defineEl from "./utils/defineEl.js";
import request from "./request.js";

export default class RouterView extends HTMLElement {
    constructor() {
        super();

        this.tplMap = new Map();
        this.current = null;
    }

    update(el) {
        this.append(this.current = el);
    }

    mount(comp) {
        const el = document.createElement(comp.name, {is: comp.name});

        import(comp.js).then(() => {
            if (this.tplMap.has(comp.name)) {
                el.innerHTML = this.tplMap.get(comp.name);
                this.update(el);
            } else {
                request(comp.template).then(tpl => {
                    this.tplMap.set(comp.name, el.innerHTML = tpl);
                    this.update(el);
                });
            }
        });
    }

    unmount() {
        if (this.current) {
            this.removeChild(this.current);

            this.current = null;
        }
    }
}

defineEl("router-view", RouterView);