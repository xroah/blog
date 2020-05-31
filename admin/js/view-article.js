import "./modules/nav.js";
import request from "./modules/request.js";
import { ARTICLE, FETCH_PREV_AND_NEXT } from "./modules/api.js";
import getSearchParams from "./modules/utils/getSearchParams.js";
import loading from "./modules/loading.js";
import formatDate from "./modules/utils/formatDate.js";

async function fetchArticle() {
    const articleId = getSearchParams("articleId");
    let ret;

    loading.show();

    try {
        ret = await request(`${ARTICLE}?articleId=${articleId}`);        
    } catch (error) {
        throw error;
    } finally{
        loading.hide();
    }

    renderArticle(ret);
}

function renderArticle(res) {
    const con = document.querySelector(".content");
    const title = document.querySelector(".title");
    const sub = document.querySelector(".sub-title");

    con.innerHTML = res.content;
    title.innerHTML = res.title;
    sub.innerHTML = `
    发布于：${formatDate(res.createTime, "YYYY-MM-DD HH:mm")}
    &nbsp;&nbsp;分类： ${res.categoryName}
    &nbsp;&nbsp;阅读${res.totalViewed}次
    &nbsp;&nbsp;今日阅读${res.todayViewed}次
    `
}

async function init() {
    try {
        await fetchArticle();
    } catch (error) {
        
    }
}

init();