import defineEl from "./utils/defineEl.js";
import formatDate from "./utils/formatDate.js";
import dialog from "./dialog.js";
import request from "./request.js";
import { ARTICLE } from "./api.js";
import message from "./message.js";
import loading from "./loading.js";

export const DELETE_ARTICLE = "delete-article";

const tpl = `
        <div class="card-body">
            <span class="status bg-info text-white">草稿</span>
            <button class="close btn btn-danger">&times;</button>
            <h5 class="card-title ellipsis"></h5>
            <h6 class="card-subtitle mb-2 text-muted"></h6>
            <p class="card-text"></p>
            <a href="#" target="_blank" class="card-link view">查看全文</a>
            <a href="#" target="_blank" class="card-link edit">编辑</a>
        </div>
`;

class ArticleCard extends HTMLElement {
    connectedCallback() {
        this.innerHTML = tpl;
        this.deleteArticle = this.deleteArticle.bind(this);

        this.classList.add("card");
        this.setInfo();
        this.updateStatus();
        this.querySelector(".close")
            .addEventListener("click", this.deleteArticle);
    }

    disconnectedCallback() {
        this.querySelector(".close")
            .removeEventListener("click", this.deleteArticle);
    }

    updateStatus() {
        const status = this.hasAttribute("draft");

        if (!status) {
            this.querySelector(".status").remove();
        }
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
        textEl.innerHTML = this.getAttribute("summary") + "...";
        viewEl.href = `/view-article?articleId=${aId}`;
        editEl.href = `/edit-article?articleId=${aId}`;
    }

    deleteArticle() {
        const aId = this.getAttribute("aId");

        dialog.confirm("确定要删除该文章吗？", {
            onOk: async () => {
                loading.show();

                try {
                    await request(ARTICLE, {
                        method: "delete",
                        body: JSON.stringify({
                            articleId: aId
                        })
                    });
                } catch (error) {
                    return;
                } finally {
                    loading.hide();
                }

                message.success("删除成功!");
                this.remove();
                document.body.dispatchEvent(new CustomEvent(DELETE_ARTICLE));
            }
        });
    }

}

defineEl("article-card", ArticleCard);