import defineEl from "./utils/defineEl.js";
import formatDate from "./utils/formatDate.js";
import dialog from "./dialog.js";
import request from "./request.js";
import { ARTICLE } from "./api.js";
import message from "./message.js";

const tpl = `
    <div class="card">
        <div class="card-body">
            <button class="close btn btn-danger">&times;</button>
            <h5 class="card-title ellipsis"></h5>
            <h6 class="card-subtitle mb-2 text-muted"></h6>
            <p class="card-text"></p>
            <a href="#" class="card-link view">查看全文</a>
            <a href="#" class="card-link edit">编辑</a>
        </div>
    </div>
`;

class ArticleCard extends HTMLElement {
    connectedCallback() {
        this.innerHTML = tpl;
        this.deleteArticle = this.deleteArticle.bind(this);

        this.setInfo();
        this.querySelector(".close")
            .addEventListener("click", this.deleteArticle);
    }

    disconnectedCallback() {
        this.querySelector(".close")
            .removeEventListener("click", this.deleteArticle);
    }

    setInfo() {
        const titleEl = this.querySelector(".card-title");
        const subTitleEl = this.querySelector(".card-subtitle");
        const textEl = this.querySelector(".card-text");
        const viewEl = this.querySelector(".view");
        const editEl = this.querySelector(".edit");
        const aId = this.getAttribute("aId");

        titleEl.innerHTML = this.getAttribute("aTitle");
        subTitleEl.innerHTML = formatDate(this.getAttribute("subTitle"), "YYYY-MM-DD HH:mm");
        textEl.innerHTML = this.getAttribute("summary");
        // viewEl.href = `this.getAttribute("aId")`;
        editEl.href = `/edit-article.html?articleId=${aId}`;
    }

    deleteArticle() {
        const aId = this.getAttribute("aId");

        dialog.confirm("确定要删除该文章吗？", {
            onOk: () => {
                request(ARTICLE, {
                    method: "delete",
                    body: JSON.stringify({
                        articleId: aId
                    })
                }).then(() => {
                    message.success("删除成功!");
                    this.remove();
                });
            }
        });
    }

}

defineEl("article-card", ArticleCard);