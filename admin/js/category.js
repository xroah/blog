import "./modules/nav.js";
import dialog from "./modules/dialog.js";
import request from "./modules/request.js";
import { CATEGORY } from "./modules/api.js";
import message from "./modules/message.js";
import formatDate from "./modules/utils/formatDate.js";
import "./modules/inline-loading.js";
import loading from "./modules/loading.js";
import upload from "./modules/utils/upload.js";
import viewImage from "./modules/utils/viewImage.js";

const DEFAULT_COVER = "./images/category_cover.png";
const DEFAULT_LABEL = "选择封面";

function showEditDialog(data = {}) {
    let html = document.getElementById("dialogTpl").innerHTML;

    html = html.replace(/\${name}/, data.name || "")
        .replace(/\${desc}/, data.desc || "")
        .replace(/\${cover}/, data.cover || DEFAULT_COVER)
        .replace(/\${coverUrl}/, data.cover || "");

    dialog.confirm(
        html,
        {
            title: "编辑分类",
            async onOk() {
                const nameEl = document.getElementById("categoryName");
                const categoryName = nameEl.value.trim();
                const categoryDesc = document.getElementById("categoryDesc").value;
                const cover = document.getElementById("coverUrl").value;

                if (!categoryName) {
                    nameEl.focus();

                    return Promise.reject();
                }

                message.destroy();
                loading.show();

                try {
                    await request(CATEGORY, {
                        method: "post",
                        body: JSON.stringify({
                            categoryId: data.id,
                            categoryName,
                            categoryDesc,
                            cover
                        })
                    });
                } catch (error) {
                    throw error;
                } finally {
                    loading.hide();
                }

                message.success("保存成功");
                this.hide();
                fetchCategories();
            }
        }
    );
}

async function fetchCategories() {
    const tbody = document.querySelector(".category-table tbody");
    let res;

    tbody.innerHTML = `<tr><td colspan="6"><inline-loading></inline-loading></td></tr>`;

    try {
        res = await request(`${CATEGORY}?queryArticle=true`);
    } catch (error) {
        return;
    }

    renderList(res);
}

function noResult() {
    const tbody = document.querySelector(".category-table tbody");

    tbody.innerHTML = `
            <tr><td colspan="6" class="text-center text-muted h5">无记录</td></tr>
        `;
}

function renderList(res) {
    const tbody = document.querySelector(".category-table tbody");
    const tpl = document.getElementById("tableTpl").innerHTML;
    let html = "";

    if (!res || !res.length) {
        return noResult();
    }

    res.forEach(c => {
        const tr = tpl.replace(/({{(.*?)}})/g, (match, s1, s2) => {
            const val = c[s2];
            if (s2 === "createTime") {
                return formatDate(val, "YYYY-MM-DD HH:mm");
            } else if (s2 === "coverUrl") {
                return c.cover ?
                    `<a href="${c.cover}" class="view-cover">查看</a>` : "";
            }

            return val === undefined ? (s2 === "articleCount" ? 0 : "") : val;
        });

        html += tr;
    });

    tbody.innerHTML = html;
}

function handleClick(evt) {
    const cls = evt.target.classList;

    if (cls.contains("edit")) {
        edit(evt);
    } else if (cls.contains("delete")) {
        del(evt);
    }
}

function edit(evt) {
    const target = evt.target;
    const tr = target.parentNode.parentNode;
    const name = tr.querySelector(".name").dataset.text;
    const desc = tr.querySelector(".desc").dataset.text;
    const cover = tr.querySelector(".cover").dataset.text;
    const id = target.dataset.id;

    showEditDialog({
        name,
        desc,
        id,
        cover
    });
}

function del(evt) {
    const target = evt.target;
    const id = target.dataset.id;
    const tr = target.parentNode.parentNode;
    const name = tr.querySelector(".name").innerHTML.trim();
    const table = document.querySelector(".category-table");

    dialog.confirm(`确定要删除 <span class="text-danger">${name}</span> 吗?`, {
        async onOk() {
            message.destroy();
            loading.show();

            try {
                await request(CATEGORY, {
                    method: "DELETE",
                    body: JSON.stringify({
                        categoryId: id
                    })
                });
            } catch (error) {
                return;
            } finally {
                loading.hide();
            }

            tr.remove();
            message.success("删除成功");

            if (!table.querySelector("tbody tr")) {
                noResult();
            }
        }
    });
}

function handleFileChange() {
    const fileEl = document.getElementById("pickCover");
    const file = fileEl.files[0];
    const preview = document.getElementById("coverPreview");
    const label = document.getElementById("pickLabel");

    message.destroy();

    if (file) {
        if (file.size / (1024 * 1024) > 1) {
            //delete selected file
            fileEl.value = "";
            label.innerHTML = DEFAULT_LABEL;

            return message.error("文件最大1MB");
        }

        label.innerHTML = file.name;
        const fr = new FileReader();

        fr.onload = () => {
            preview.src = fr.result;
        };
        fr.readAsDataURL(file);
    } else {
        preview.src = DEFAULT_COVER;
        label.innerHTML = DEFAULT_LABEL;
    }
}

async function handleUpload() {
    const fileEl = document.getElementById("pickCover");
    const file = fileEl.files[0];
    const progressEl = document.getElementById("progress");
    const bar = progressEl.firstElementChild;
    let ret;

    message.destroy();

    if (!file) return message.error("请选择封面图片");

    bar.style.width = "0%";

    progressEl.classList.remove("d-none");
    try {
        ret = await upload(file, progress => {
            bar.style.width = `${progress}%`;
        });
    } catch (error) {
        return message.error(error);
    } finally {
        progressEl.classList.add("d-none");
    }

    fileEl.value = "";
    document.getElementById("coverUrl").value = ret;
    document.getElementById("pickLabel").innerHTML = DEFAULT_LABEL;
    document.getElementById("uploadedCover").src = ret;
}

function initEvents() {
    const add = document.querySelector(".add-btn");
    const table = document.querySelector(".category-table");

    add.addEventListener("click", showEditDialog);
    table.addEventListener("click", handleClick);
    document.body.addEventListener("click", evt => {
        const target = evt.target;

        if (target.id === "upload") {
            handleUpload();
        } else if (target.classList.contains("view-cover")) {
            viewImage(target.href);
            evt.preventDefault();
        }
    });
    document.body.addEventListener("change", evt => {
        if (evt.target.id === "pickCover") {
            handleFileChange();
        }
    })
}

function init() {
    initEvents();
    fetchCategories();
}

init();