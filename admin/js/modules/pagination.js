import defineEl from "./utils/defineEl.js";

export const PAGE_CHANGE = "page-change";

class Pagination extends HTMLElement {
    constructor() {
        super();

        this._total = 0;
        this._pageSize = 10;
        this._current = 1;
        this.handleClick = this.handleClick.bind(this);
    }

    get total() {
        return this._total;
    }

    set total(total) {
        if (this._total === total) return;

        this._total = +total || 0;
        this.renderItem();
    }

    get current() {
        return this._current;
    }

    set current(cur) {
        if (this._current === cur) return;

        this._current = +cur || 1;
        this.renderItem();
    }

    get pageSize() {
        return this.pageSize;
    }

    set pageSize(pageSize) {
        this._pageSize = +pageSize || 10;
    }

    genItem(page, className) {
        const active = page === this.current ? "active" : "";

        return `
            <li class="page-item ${className || ""} ${active}">
                <a href="#" class="page-link" data-page="${page}">${page}</a>
            </li>
        `;
    }
    genItems(start, end) {
        let html = "";

        for (let i = start; i <= end; i++) {
            html += this.genItem(i);
        }

        return html;
    }

    getTotalPages() {
        return Math.ceil(this._total / this._pageSize);
    }

    renderItem() {
        const totalPages = this.getTotalPages();
        const ellipsis = this.genItem("...", "disabled");
        let html = this.genItem("上一页", "prev");

        if (totalPages <= 10) {
            html += this.genItems(1, totalPages);
        } else {
            //before ellipsis
            if (this.current <= 4) {
                html += this.genItems(1, 5) + ellipsis + this.genItem(totalPages);
            } else if (this.current >= totalPages - 3) {//after ellipsis
                html += this.genItem(1) + ellipsis + this.genItems(totalPages - 4, totalPages)
            } else {
                html += this.genItem(1)
                    + ellipsis
                    + this.genItems(this.current - 2, this.current + 2)
                    + ellipsis +
                    this.genItem(totalPages);
            }
        }

        html += this.genItem("下一页", "next");

        this.innerHTML = `
            <ul class="pagination">
                ${html}
            </ul>
        `;

        const prev = this.querySelector(".prev");
        const next = this.querySelector(".next");

        if (this.current === 1) {
            prev.classList.add("disabled");
        }

        if (totalPages === this.current) {
            next.classList.add("disabled");
        }
    }

    handleClick(evt) {
        const target = evt.target;
        const parent = target.parentNode;

        if (
            !target.classList.contains("page-link") ||
            parent.classList.contains("disabled")
        ) return;

        if (parent.classList.contains("prev")) {
            if (this.current > 1) {
                this.current -= 1;
            }
        } else if (parent.classList.contains("next")) {
            if (this.current < this.getTotalPages()) {
                this.current += 1;
            }
        } else {
            this.current = +target.getAttribute("data-page")
        }

        this.dispatchEvent(
            new CustomEvent(PAGE_CHANGE, {
                detail: this.current
            })
        );
        this.renderItem();
        evt.preventDefault();
    }

    connectedCallback() {
        this._total = +this.getAttribute("total") || 0;
        this._current = +this.getAttribute("current") || 1;

        this.renderItem();
        this.addEventListener("click", this.handleClick)
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.handleClick);
    }
}

defineEl("bs-pagination", Pagination);