import "./modules/nav.js";
import request from "./modules/request.js";
import { ARTICLE } from "./modules/api.js";

function fetchArticleList(param) {
    request(ARTICLE)
    .then(res => {
        console.log(res);
    });
}

fetchArticleList();