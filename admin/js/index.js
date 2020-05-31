import "./modules/nav.js";
import request from "./modules/request.js";
import { ARTICLE } from "./modules/api.js";
import { PAGE_CHANGE } from "./modules/pagination.js";
import "./modules/article-card.js";
import "./modules/inline-loading.js";

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
            document.querySelector("bs-pagination").total = res.total;
            renderList(res.list);
        });
}

function renderList(res) {
    const wrapper = document.querySelector(".article-list");
    wrapper.innerHTML = '<div class="text-muted text-center">无记录</div>';

    if (!res.length) return;

    const frag = document.createDocumentFragment();
    wrapper.innerHTML = "";

    for (let a of res) {
        const card = document.createElement("article-card", { is: "article-card" });

        card.setAttribute("aId", a._id);
        card.setAttribute("subTitle", a.createTime);
        card.setAttribute("summary", a.summary);
        card.setAttribute("aTitle", a.title);

        frag.appendChild(card);
    }

    wrapper.appendChild(frag);
}

function handlePageChange(evt) {
    const page = evt.detail;
    location.href = `${location.pathname}#page=${page}`;

    fetchArticleList({ page });
}

function init() {
    const pagination = document.querySelector("bs-pagination");
    const hash = location.hash.substring(1).split("&");
    let page = 1;

    for (let p of hash) {
        const tmp = p.split("=");

        if (tmp[0] === "page") {
            page = +tmp[1];
        }
    }

    pagination.current = page;
    fetchArticleList({ page });
    pagination.addEventListener(PAGE_CHANGE, handlePageChange)
}

init();