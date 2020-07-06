import request from "./modules/request.js";
import { COMMENT } from "./modules/api.js";
import renderList from "./modules/utils/renderList.js";
import formatDate from "./modules/utils/formatDate.js";
import "./modules/inline-loading.js";
import dialog from "./modules/dialog.js";
import message from "./modules/message.js";
import loading from "./modules/loading.js";
import defineEl from "./modules/utils/defineEl.js";
import handleUrl from "./modules/utils/handleUrl.js";
import { noResult, rowLoading } from "./modules/utils/row.js";
import { createPagination, DATA_UPDATE } from "./modules/another-pagination.js";

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
                    setTimeout(() => location.href = "/comment", 1000);
                } catch (error) {
                    loading.hide();
                }
            }
        }
    );
}

function handleClick(evt) {
    const target = evt.target;
    const classes = target.classList;
    
    if (classes.contains("delete")) {
        del(target);
    }
}

function render(evt) {
    const data = evt.detail || [];
    const tbody = document.querySelector(".comment-table tbody");
    const tpl = document.getElementById("listTpl").innerHTML;
    const len = data.length;

    if (!len) {
        return noResult(tbody, 5);
    }

    renderList(
        tbody,
        tpl,
        data,
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

const pagination = createPagination({
    url: COMMENT,
    handleLoading() {
        const tbody = document.querySelector(".comment-table tbody");
        
        rowLoading(tbody, 5);
    }
});

export default class CommentPage extends HTMLElement {
    async onUpdate() {
        await pagination.fetchData();
    }

    async connectedCallback() {
        document.title = "评论管理";

        this.appendChild(pagination);
        pagination.addEventListener(DATA_UPDATE, render);

        await this.onUpdate();

        document.body.addEventListener("click", handleClick);
        document.getElementById("pagination").classList.remove("d-none");
    }

    disconnectedCallback() {
        document.body.removeEventListener("click", handleClick);
        pagination.removeEventListener(DATA_UPDATE, render);

        pagination = null;
    }
}

defineEl("comment-page", CommentPage);