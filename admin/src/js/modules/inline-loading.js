import defineEl from "./utils/defineEl.js";

class InlineLoading extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="spinner-grow text-dark"></div>`;
    }
}

defineEl("inline-loading", InlineLoading);