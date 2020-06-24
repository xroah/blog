import "./modules/nav.js";
import request from "./modules/request.js";
import { COMMENT } from "./modules/api.js";
import renderList from "./modules/utils/renderList.js";
import formatDate from "./modules/utils/formatDate.js";
import "./modules/inline-loading.js";
import getUrlParams from "./modules/utils/getUrlParams.js";
import dialog from "./modules/dialog.js";
import message from "./modules/message.js";
import loading from "./modules/loading.js";

let dir = ""; //previous or next page
let before = "";
let after = "";

async function fetchComments() {
    const tbody = document.querySelector(".comment-table tbody");
    let query = "";
    let ret;

    if (dir === "before") {
        query = `before=${before}`;
    } else if (dir === "after") {
        query = `after=${after}`;
    }

    tbody.innerHTML = `<tr><td colspan="5"><inline-loading></inline-loading></td></tr>`;

    try {
        ret = await request(`${COMMENT}?${query}`);
    } catch (error) {
        return;
    }

    render(ret);
}

function handleUrl(url) {
    if (!url) return;

    if (url.startsWith("http")) {
        return url;
    }

    return `//${url}`;
}

function render(res) {
    const tbody = document.querySelector(".comment-table tbody");
    const tpl = document.getElementById("listTpl").innerHTML;
    const prevEl = document.querySelector(".prev");
    const nextEl = document.querySelector(".next");
    const {
        hasMore,
        list = []
    } = res;
    const len = list.length;

    nextEl.classList.remove("disabled");
    prevEl.classList.remove("disabled");

    if (!hasMore) {
        //page just loaded
        if (!dir) {
            prevEl.classList.add("disabled");
            nextEl.classList.add("disabled");
        } else {

            if (dir === "before") {
                prevEl.classList.add("disabled");
            } else if (dir === "after") {
                nextEl.classList.add("disabled");
            }
        }
    } else if (!dir) {
        prevEl.classList.add("disabled");
    }

    if (!len) {
        return tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted h5">无记录</td></tr>';
    }

    before = list[0]._id;
    after = list[len - 1]._id;

    renderList(
        tbody,
        tpl,
        list,
        (match, val, item) => {
            if (match === "createTime") {
                return formatDate(val, "YYYY-MM-DD HH:mm");
            }

            if (match === "username") {
                let h = item.homepage;
                val = item.isAuthor ? '<span class="text-orange">我</span>' : val;;

                return h && !item.isAuthor ? `<a target="_blank" href="${handleUrl(h)}">${val}</a>` : val;

            }

            return val || "";
        }
    );
}

async function del(target) {
    const tr = target.parentNode.parentNode;
    const content = tr.querySelector(".content").innerHTML;

    dialog.confirm(
        `<div>
            确认要 <span class="text-danger">${content}</span> 删除吗，
            这将删除该条评论以及回复该条评论的所有评论？
        </div>`,
        {
            async onOk() {
                loading.show();

                try {
                    await request(COMMENT, {
                        method: "delete",
                        body: JSON.stringify({
                            commentId: target.dataset.id
                        })
                    });

                    message.success("删除成功!");
                    setTimeout(() => location.href = "/comment.html", 1000);
                } catch (error) {
                    loading.hide();
                }
            }
        }
    );
}

async function handleHashChange() {
    ({ before, after } = getUrlParams(null, true));

    dir = before ? "before" : after ? "after" : "";
    await fetchComments();
}

function initEvents() {
    document.addEventListener("click", evt => {
        const target = evt.target;
        const classes = target.classList;
        const parent = target.parentNode;
        let hash = "";

        if (
            classes.contains("disabled") ||
            (parent && parent.classList.contains("disabled"))
        ) return;

        if (classes.contains("to-prev")) {
            hash = `before=${before}`;
        } else if (classes.contains("to-next")) {
            hash = `after=${after}`;
        } else if (classes.contains("delete")) {
            del(target);
        }

        if (hash) {
            location.href = `${location.origin}${location.pathname}#${hash}`;
        }
    });
    window.addEventListener("hashchange", handleHashChange);
}

async function init() {
    await handleHashChange();
    initEvents();
    document.getElementById("pagination").classList.remove("d-none");
}

init();