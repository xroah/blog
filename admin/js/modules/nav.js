import defineEl from "./utils/defineEl.js";
import request from "./request.js";

class SysNav extends HTMLElement {

    constructor() {
        super();

        request("/templates/nav.html")
            .then(this.init.bind(this))
    }

    init(html) {
        let shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = html;

        const links = shadowRoot.querySelectorAll(".item-list a");
        const pathname = location.pathname;

        for (let a of links) {
            if (
                (
                    a.classList.contains("home") &&
                    (
                        pathname === "/" ||
                        pathname === "/index.html"
                    )
                ) ||
                a.pathname === pathname
            ) {
                a.classList.add("active")
            }
        }
    }

}

defineEl("sys-nav", SysNav);