import request from "./modules/request.js";
import { ARTICLE } from "./modules/api.js";
import loading from "./modules/loading.js";
import formatDate from "./modules/utils/formatDate.js";
import defineEl from "./modules/utils/defineEl.js";
import hljs from "../vendors/js/highlight.pack.js";
import { COMMENT } from "./modules/api.js";
import "./modules/inline-loading.js";
import { SAVE_SUCCESS } from "./modules/comment-editor.js";
import { renderToString } from "./modules/utils/renderList.js";
import handleUrl from "./modules/utils/handleUrl.js";
import dialog from "./modules/dialog.js";
import message from "./modules/message.js";

let comments = [];

async function fetchArticle() {
    const articleId = window.__router__.query.articleId;
    let ret;

    loading.show();

    try {
        ret = await request(`${ARTICLE}?articleId=${articleId}`);
    } catch (error) {
        throw error;
    } finally {
        loading.hide();
    }

    renderArticle(ret);
    await fetchComments();
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
    `;
    document.title = `查看--${res.title}`;
}

async function fetchComments() {
    const articleId = window.__router__.query.articleId;
    const list = document.getElementById("commentList");
    let ret;

    list.innerHTML = "<inline-loading></inline-loading>";

    try {
        ret = await request(`${COMMENT}?articleId=${articleId}`);
    } catch (error) {
        list.innerHTML = "获取评论失败";
        return;
    }

    comments = ret;
    renderComments(ret);
}

function renderComments(ret) {
    const tpl = document.getElementById("commentItemTpl").innerHTML;
    const replyMap = new Map();
    const handler = (match, val, item) => {
        switch (match) {
            case "replyInfo":
                return handleUser(item);
            case "createTime":
                return formatDate(item.createTime, "YYYY-MM-DD HH:mm");
            case "root":
                return item.root || item._id;
            case "orig":
                const replyTo = replyMap.get(item.replyTo);

                if (replyTo) {
                    return `<div class="orig-comment">${handleUser(replyTo)}： ${replyTo.content}</div>`;
                }

                return "";
            default:
                return val;
        }
    };
    const loop = data => {
        data.forEach(d => {
            replyMap.set(d._id, d);

            if (d.children) {
                loop(d.children);
            }
        });
    }

    loop(ret);

    const string = renderToString(
        tpl,
        ret,
        handler,
        item => item.replyTo && replyMap.has(item.replyTo)
    );
    document.getElementById("commentList").innerHTML = string;
}

function handleUser(comment) {
    const homepage = comment.homepage;
    const username = comment.username;

    if (homepage) {
        return `<a class="text-info" target="_blank" href="${handleUrl(homepage)}">${username}</a>`;
    }

    return comment.isAuthor ? `<a style="color: var(--orange)">我</a>` : `<a>${username}</a>`;
}

function handleClick(evt) {
    const target = evt.target;

    if (target.classList.contains("reply-link")) {
        target.parentNode.nextElementSibling.show();
        evt.preventDefault();
    } else if (target.classList.contains("delete-link")) {
        const content = target.parentNode.previousElementSibling.innerHTML;

        dialog.confirm(
            `
            确定要删除 <span class="text-danger">${content}</span> 吗？
            这将删除该评论以及回复的所有评论。
            `,
            {
                onOk() {
                    del(target.getAttribute("data-id"));
                }
            }
        );
        evt.preventDefault();
    }
}

async function del(id) {
    loading.show();

    try {
       await request(COMMENT, {
           method: "delete",
           body: JSON.stringify({
               commentId: id
           })
       });

       message.success("删除成功");
    } catch (error) {
        return;
    } finally {
        loading.hide();
    }

    for (let i = comments.length - 1; i >= 0; i--) {
        let c = comments[i];

        if (c._id === id) {
            comments.splice(i, 1);
            break;
        } else {
            const children = c.children || [];

            for (let i = children.length - 1; i >= 0; i--) {
                let c = children[i];

                if (c._id === id || c.replyTo === id) {
                    children.splice(i, 1);
                }
            }
        }
    }

    renderComments(comments);
}

function insertComment(evt) {
    const comment = evt.detail;

    if (!comment) return;

    for (let c of comments) {
        if (c._id === comment.root) {
            if (!c.children) {
                c.children = [];
            }

            c.children.push(comment);
            break;
        }
    }

    renderComments(comments);
}

export default class ViewArticle extends HTMLElement {
    async connectedCallback() {
        await fetchArticle();

        document.querySelectorAll("pre").forEach((block) => {
            hljs.highlightBlock(block);
        });

        document.body.addEventListener("click", handleClick);
        document.body.addEventListener(SAVE_SUCCESS, insertComment);
    }

    disconnectedCallback() {
        document.body.removeEventListener("click", handleClick);
        document.body.removeEventListener(SAVE_SUCCESS, insertComment);

        comments = null;
    }
}

defineEl("view-article", ViewArticle);