import "./modules/nav.js";
import "./modules/router-view.js";
import Router from "./modules/router.js";
import "./modules/router-view.js";

const routes = [{
    path: "/",
    name: "home-page",
    template: "/templates/home.html",
    js: "/js/home.js"
}, {
    path: "/category",
    name: "category-page",
    template: "/templates/category.html",
    js: "/js/category.js"
}, {
    path: "/comment",
    name: "comment-page",
    template: "/templates/comment.html",
    js: "/js/comment.js"
}, {
    path: "/edit-article",
    name: "edit-article",
    template: "/templates/edit-article.html",
    js: "/js/edit-article.js"
}, {
    path: "/view-article",
    name: "view-article",
    template: "/templates/view-article.html",
    js: "/js/view-article.js"
}];

const view = document.querySelector("router-view");

new Router(routes, view).init();