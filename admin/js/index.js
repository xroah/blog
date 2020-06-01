import "./modules/nav.js";
import request from "./modules/request.js";
import { ARTICLE } from "./modules/api.js";
import { PAGE_CHANGE } from "./modules/pagination.js";
import "./modules/inline-loading.js";
import { DELETE_ARTICLE } from "./modules/article-card.js";

function fetchArticleList(param) {
    const query = [];

    document.querySelector(".article-list").innerHTML = "<inline-loading></inline-loading>";

    if (param) {
        Object.keys(param).forEach(key => {
            query.push(`${key}=${param[key]}`);
        });
    }

    request(`${ARTICLE}?${query.join("&")}`)
        .then(res => {
            document.querySelector("bs-pagination").total = res.total || 1;
            renderList(res.list);
        });
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
    location.href = `${location.pathname}#page=${page}`;
}

function handleHashChange() {
    const hash = location.hash.substring(1).split("&");
    const pagination = document.querySelector("bs-pagination");
    let page = 1;

    for (let p of hash) {
        const tmp = p.split("=");

        if (tmp[0] === "page") {
            page = +tmp[1];
            break;
        }
    }

    pagination.current = page;

    fetchArticleList({ page });

    return page;
}

function init() {
    const pagination = document.querySelector("bs-pagination");

    handleHashChange();
    pagination.addEventListener(PAGE_CHANGE, handlePageChange);
    window.addEventListener("hashchange", handleHashChange);
    document.body.addEventListener(DELETE_ARTICLE, handleHashChange);
}

init();