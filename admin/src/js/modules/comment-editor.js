import defineEl from "./utils/defineEl.js";
import request from "./request.js";
import { COMMENT } from "./api.js";
import message from "./message.js";

export const SAVE_SUCCESS = "save-success";

class CommentEditor extends HTMLElement {
    constructor () {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    get disabled() {
        return this.hasAttribute("disabled");
    }

    set disabled(disabled) {
        const els = this.querySelectorAll("button, textarea");

        if (disabled) {
            this.setAttribute("disabled", "");
        } else {
            this.removeAttribute("disabled");
        }

        els.forEach(el => {
            el.disabled = disabled;
        });
    }

    get replyTo() {
        return this.getAttribute("replyTo");
    }

    get articleId () {
        return this.getAttribute("articleId");
    }

    get root() {
        return this.getAttribute("root");
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="comment-editor mt-3">
                <textarea rows="5" class="form-control"></textarea>
                <div class="d-flex justify-content-end my-3">
                    <button class="btn btn-primary ok mr-2">确定</button>
                    <button class="btn btn-light cancel">取消</button>
                </div>
            </div>
        `;
        this.style.display = "none";

        this.initEvents();
    }

    disconnectedCallback() {
        this.removeEvents();
    }

    show() {
        this.style.display = "block";
    }

    hide() {
        this.style.display = "none";
    }

    async handleClick(evt) {
        const target = evt.target;

        if (target.classList.contains("cancel")) {
            this.hide();
        } else if (target.classList.contains("ok")) {
            const textarea = this.querySelector("textarea");
            const value = textarea.value.trim();

            if (!value) {
                return textarea.focus();
            }

            this.disabled = true;

            try {
               const ret = await request(COMMENT, {
                   method: "post",
                   body: JSON.stringify({
                       articleId: this.articleId,
                       content: value,
                       root: this.root,
                       replyTo: this.replyTo
                   })
               });
               textarea.value = ""; 
               
               message.success("评论成功");
               document.body.dispatchEvent(
                   new CustomEvent(SAVE_SUCCESS, {
                       detail: ret
                   })
               );
               this.hide();
            } catch (error) {
                
            } finally {
                this.disabled = false;
            }
        }
    }

    initEvents() {
        this.addEventListener("click", this.handleClick);
    }

    removeEvents() {
        this.removeEventListener("click", this.handleClick);
    }
}

defineEl("comment-editor", CommentEditor);