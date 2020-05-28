import "./modules/nav.js";
import request from "./modules/request.js";
import { ARTICLE } from "./modules/api.js";
import "./modules/article-card.js";

function fetchArticleList(param) {
    const query = [];

    if (param) {
        Object.keys(param).forEach(key => {
            query.push(`${key}=${param[key]}`);
        });
    }

    request(`${ARTICLE}?${query.join("&")}`)
        .then(renderList);
}

function renderList(res) {
    if (!res.length) return;

    const frag = document.createDocumentFragment();
    const wrapper = document.querySelector(".article-list");

    for (let a of res) {
        const card = document.createElement("article-card", { is: "article-card" });

        card.setAttribute("aId", a._id);
        card.setAttribute("subTitle", a.createTime);
        card.setAttribute("summary", a.summary);
        card.setAttribute("aTitle", a.title);

        frag.appendChild(card);
    }

    wrapper.appendChild(frag);
    console.log(res)
}

function init() {
    fetchArticleList();
}

init();