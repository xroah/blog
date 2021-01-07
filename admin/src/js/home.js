import "./modules/nav.js";
import request from "./modules/request.js";
import { ARTICLE } from "./modules/api.js";
import { PAGE_CHANGE } from "./modules/pagination.js";
import "./modules/inline-loading.js";
import { DELETE_ARTICLE } from "./modules/article-card.js";
import getUrlParams from "./modules/utils/getUrlParams.js";
import defineEl from "./modules/utils/defineEl.js";

async function fetchArticleList(param) {
    const query = [];
    const pagination = document.querySelector("bs-pagination");
    let res;

    if (fetchArticleList.abortCtrl) {
        fetchArticleList.abortCtrl.abort();
    }

    const ctrl = fetchArticleList.abortCtrl = new AbortController();

    document.querySelector(".article-list").innerHTML = "<inline-loading></inline-loading>";

    if (param) {
        Object.keys(param).forEach(key => {
            query.push(`${key}=${param[key]}`);
        });
    }

    try {
        res = await request(`${ARTICLE}?${query.join("&")}`, {
            signal: ctrl.signal
        });
    } catch (error) {
        return;
    } finally {
        fetchArticleList.abortCtrl = null;
    }

    pagination.total = res.total || 1;
    pagination.style.display = "";
    renderList(res.list);
}

function renderList(res) {
    const wrapper = document.querySelector(".article-list");
    wrapper.innerHTML = '<div class="text-muted w-100 p-3 h5 text-center">无记录</div>';

    if (!res.length) return;

    const frag = document.createDocumentFragment();
    wrapper.innerHTML = "";

    for (let a of res) {
        const card = document.createElement("article-card", { is: "article-card" });

        card.setAttribute("aId", a._id);
        card.setAttribute("subTitle", a.createTime);
        card.setAttribute("summary", a.summary);
        card.setAttribute("aTitle", a.title || "无标题");
        if (a.draft) {
            card.setAttribute("draft", "");
        }

        frag.appendChild(card);
    }

    wrapper.appendChild(frag);
}

function handlePageChange(evt) {
    const page = evt.detail;

    updateQuery({ page });
}

function updateQuery(obj) {
    const router = window.__router__;
    const params = { ...router.query };
    const pathname = location.pathname;
    const pagination = document.querySelector("bs-pagination");
    let query = [];

    for (let key in obj) {
        params[key] = obj[key];
    }

    Object.keys(params).forEach(key => {
        query.push(`${key}=${params[key]}`);
    });

    pagination.current = params.page || 1;
    router.push(`${pathname}?${query.join("&")}`);
}

function handleChange(evt) {
    const target = evt.target;
    const name = target.name;

    updateQuery({
        [name]: target.value,
        page: 1
    });
}

function updateSelectValue(sel, val) {
    const children = sel.children;
    let hasVal = false;

    for (let opt of children) {
        if (opt.value === val) {
            hasVal = true;
            break;
        }
    }

    if (hasVal) {
        sel.value = val;
    }
}

export default class HomePage extends HTMLElement {
    constructor() {
        super();

        this.handleDelete = this.handleDelete.bind(this);
    }

    onUpdate() {
        const params = window.__router__.query;
        const pagination = document.querySelector("bs-pagination");
        const secretEl = document.getElementById("secret");
        const draftEl = document.getElementById("draft");
        pagination.current = params.page;

        pagination.setAttribute("current", params.page);
        updateSelectValue(secretEl, params.secret);
        updateSelectValue(draftEl, params.draft);
        fetchArticleList(params);
    }

    handleDelete() {
        const card = document.querySelector("article-card");

        //no any article on this page
        if (!card) {
            let page = getUrlParams("page", true) || 1;

            if (page > 1) {
                page--;

                return updateQuery({ page });
            }
        }

        this.onUpdate();
    }

    connectedCallback() {
        this.init();
    }

    disconnectedCallback() {
        document.body.removeEventListener(DELETE_ARTICLE, this.handleDelete);
    }

    init() {
        const pagination = document.querySelector("bs-pagination");
        const secretEl = document.getElementById("secret");
        const draftEl = document.getElementById("draft");
        document.title = "首页";

        this.onUpdate();
        pagination.addEventListener(PAGE_CHANGE, handlePageChange);
        document.body.addEventListener(DELETE_ARTICLE, this.handleDelete);
        secretEl.addEventListener("change", handleChange);
        draftEl.addEventListener("change", handleChange);
    }
}

defineEl("home-page", HomePage);