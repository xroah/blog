import request from "./request.js";
import "./inline-loading.js";
import defineEl from "./utils/defineEl.js";

export const DATA_UPDATE = "DATA_UPDATE";

class AnotherPagination extends HTMLElement {

    constructor() {
        super();

        this._dir = ""; //previous or next page
        this.before = "";
        this.after = "";
        this.url = "";
        this.handleLoading = null;
        this.handleParams = null;
        this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
        const { before, after } = window.__router__.query;
        this.before = before;
        this.after = after;
        this.innerHTML = `
        <ul id="pagination" class="d-none pagination justify-content-center">
            <li class="page-item prev">
                <a class="page-link to-prev" href="javascript: void 0;">上一页</a>
            </li>
            <li class="page-item next">
                <a class="page-link to-next" href="javascript: void 0;">下一页</a>
            </li>
        </ul>
        `;
        this.addEventListener("click", this.handleClick);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.handleClick);
    }

    async fetchData() {
        let query = "";
        let ret;
        let { before, after } = window.__router__.query;
        let dir = this._dir = before ? "before" : after ? "after" : "";

        if (dir === "before") {
            query = `before=${before}`;
        } else if (dir === "after") {
            query = `after=${after}`;
        }

        if (this.handleParams) {
            query += `&${this.handleParams()}`;
        }

        if (this.handleLoading) {
            this.handleLoading();
        }

        try {
            ret = await request(`${this.url}?pageSize=20&${query}`);
        } catch (error) {
            this.style.display = "none";
            return;
        }

        this.handleData(ret);
    }

    handleData(res) {
        const prev = this.querySelector(".prev").classList;
        const next = this.querySelector(".next").classList;
        const {
            hasMore,
            list = []
        } = res;
        const len = list.length;

        next.remove("disabled");
        prev.remove("disabled");

        if (!hasMore) {
            if (!this._dir) {
                prev.add("disabled");
                next.add("disabled");
            } else {
                if (this._dir === "before") {
                    prev.add("disabled");
                } else if (this._dir === "after") {
                    next.add("disabled");
                }
            }
        } else if (!this._dir) {
            prev.add("disabled");
        }

        this.dispatchEvent(new CustomEvent(DATA_UPDATE, { detail: list }));

        if (!len) {
            this.style.display = "none";

            return;
        }

        this.before = list[0]._id;
        this.after = list[len - 1]._id;
    }

    handleClick(evt) {
        const target = evt.target;
        const classes = target.classList;
        const parent = target.parentNode;
        let query = "";

        if (
            classes.contains("disabled") ||
            (parent && parent.classList.contains("disabled"))
        ) return;

        if (classes.contains("to-prev")) {
            query = `before=${this.before}`;
        } else if (classes.contains("to-next")) {
            query = `after=${this.after}`;
        }

        window.__router__.push(`${location.pathname}?${query}`);
    }
}

defineEl("another-pagination", AnotherPagination);

export function createPagination(options = {}) {
    const el = document.createElement("another-pagination");

    el.handleLoading = options.handleLoading;
    el.handleParams = options.handleParams;
    el.url = options.url || "";

    return el;
}