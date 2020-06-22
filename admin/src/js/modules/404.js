import defineEl from "./utils/defineEl.js";

export default class NotFound extends HTMLElement {

    connectedCallback() {
        const text = this.innerHTML;

        this.innerHTML = `
            <div class="text-center">
                <div class="error-404">
                    <img src="/images/404.gif"/>
                </div>
                <p class="h5">${text}</p>            
                <div class="mt-3">
                    <a href="/" class="btn btn-primary">返回首页</a>
                </div>
            </div>
        `
    }

}

defineEl("not-found", NotFound);