import "./modules/nav.js";
import request from "./modules/request.js";
import { COMMENT } from "./modules/api.js";
import renderList from "./modules/utils/renderList.js";
import formatDate from "./modules/utils/formatDate.js";

async function fetchComments() {
    let ret;

    try {
        ret = await request(COMMENT);
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
    const tbody = document.querySelector(".table tbody");
    const tpl = document.getElementById("listTpl").innerHTML;

    renderList(
        tbody,
        tpl,
        res.list,
        (match, val, item) => {
            if (match === "createTime") {
                return formatDate(val, "YYYY-MM-DD HH:mm");
            }

            if (match === "username") {
                let h = item.homepage;

                return h ? `<a target="_blank" href="${handleUrl(h)}">${val}</a>` :
                    item.isAuthor ? '<span class="text-orange">我</span>' : val;
            }

            return val || "";
        }
    );
}

fetchComments();