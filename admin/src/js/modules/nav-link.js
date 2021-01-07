import { pathToRegexp } from "./path-to-regexp.js"
import defineEl from "./utils/defineEl.js";
import { cleanPath } from "./utils/path.js";
import { PATH_CHANGE } from "./router.js";

class NavLink extends HTMLElement {
    constructor() {
        super();

        this.handlePathChange = this.handlePathChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    get exact() {
        return this.hasAttribute("exact");
    }

    set to(to) {
        this.setAttribute("to", to);
    }

    get to() {
        return this.getAttribute("to");
    }

    handlePathChange() {
        const pathname = cleanPath(location.pathname);
        const regex = pathToRegexp(pathname, {
            end: this.exact
        });

        if (regex.test(this.to)) {
            this.classList.add("active");
        } else {
            this.classList.remove("active");
        }
    }

    handleClick() {
        const router = window.__router__;

        if (!router) return;

        router.push(this.to);
    }

    connectedCallback() {
        document.body.addEventListener(PATH_CHANGE, this.handlePathChange);
        this.addEventListener("click", this.handleClick);
        this.handlePathChange();
    }

    disconnectedCallback() {
        document.body.removeEventListener(PATH_CHANGE, this.handlePathChange);
        this.removeEventListener("click", this.handleClick);
    }
}

defineEl("nav-link", NavLink);