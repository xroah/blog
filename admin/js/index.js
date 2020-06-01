import "./modules/nav.js";
import request from "./modules/request.js";
import { ARTICLE } from "./modules/api.js";
import { PAGE_CHANGE } from "./modules/pagination.js";
import "./modules/inline-loading.js";
import { DELETE_ARTICLE } from "./modules/article-card.js";

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

    updateHash({ page });
}

function getHashParams() {
    const hash = location.hash.substring(1).split("&");
    let params = {};

    for (let p of hash) {
        const tmp = p.split("=");

        if (!tmp[0]) continue;

        if (tmp[0] === "page") {
            params.page = +tmp[1];
        } else {
            params[tmp[0]] = tmp[1];
        }
    }

    return params;
}

function handleHashChange() {
    fetchArticleList(getHashParams());
}

function handleDelete() {
    const card = document.querySelector("article-card");

    //no any article on this page
    if (!card) {
        let page = getHashParams().page || 1;

        if (page > 1) {
            page--;

            return updateHash({ page });
        }
    }

    handleHashChange();
}

function updateHash(obj) {
    const params = getHashParams();
    const pathname = location.pathname;
    const pagination = document.querySelector("bs-pagination");
    let hash = [];

    for (let key in obj) {
        params[key] = obj[key];
    }

    Object.keys(params).forEach(key => {
        hash.push(`${key}=${params[key]}`);
    });

    pagination.current = params.page || 1;
    location.href = `${pathname}#${hash.join("&")}`;
}

function handleChange(evt) {
    const target = evt.target;
    const name = target.name;

    updateHash({
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

function init() {
    const pagination = document.querySelector("bs-pagination");
    const secretEl = document.getElementById("secret");
    const draftEl = document.getElementById("draft");
    const params = getHashParams();

    pagination.current = params.page || 1;
    
    updateSelectValue(secretEl, params.secret);
    updateSelectValue(draftEl, params.draft);
    handleHashChange();
    pagination.addEventListener(PAGE_CHANGE, handlePageChange);
    window.addEventListener("hashchange", handleHashChange);
    document.body.addEventListener(DELETE_ARTICLE, handleDelete);
    secretEl.addEventListener("change", handleChange);
    draftEl.addEventListener("change", handleChange);
}

init();