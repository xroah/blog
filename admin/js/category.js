import "./modules/nav.js";
import dialog from "./modules/dialog.js";
import request from "./modules/request.js";
import { CATEGORY } from "./modules/api.js";
import message from "./modules/message.js";
import formatDate from "./modules/utils/formatDate.js";
import "./modules/inline-loading.js";
import loading from "./modules/loading.js";

function showEditDialog(data = {}) {
    const html = `
            <div class="form-group">
                <label for="categoryName">分类名称：</label>
                <input type="text" maxlength="10" value="${data.name || ""}" class="form-control" id="categoryName">
            </div>
            <div class="form-group">
                <label for="categoryDesc">描述：</label>
                <textarea maxlength="50" class="form-control" id="categoryDesc">${data.desc || ""}</textarea>
            </div>
    `;

    dialog.confirm(
        html,
        {
            title: "编辑分类",
            async onOk() {
                const nameEl = document.getElementById("categoryName");
                const categoryName = nameEl.value.trim();
                const categoryDesc = document.getElementById("categoryDesc").value;

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
                            categoryDesc
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

    tbody.innerHTML = `<tr><td colspan="5"><inline-loading></inline-loading></td></tr>`;

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
            <tr><td colspan="5" class="text-center text-muted h5">无记录</td></tr>
        `;
}

function renderList(res) {
    const tbody = document.querySelector(".category-table tbody");
    const tpl = `
        <tr>
            <td class="name">{{name}}</td>
            <td>{{createTime}}</td>
            <td class="desc">{{desc}}</td>
            <td>{{articleCount}}</td>
            <td>
                <a href="#" class="text-primary edit mr-2" data-id="{{_id}}">编辑</a>
                <a href="#" class="text-danger delete" data-id={{_id}}>删除</a>
            </td>
        </tr>
    `;
    let html = "";

    if (!res || !res.length) {
        return noResult();
    }

    res.forEach(c => {
        const tr = tpl.replace(/({{(.*?)}})/g, (match, s1, s2) => {
            const val = c[s2];
            if (s2 === "createTime") {
                return formatDate(val, "YYYY-MM-DD HH:mm");
            }

            return val === undefined ? "" : val;
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
    const name = tr.querySelector(".name").innerHTML.trim();
    const desc = tr.querySelector(".desc").innerHTML.trim();
    const id = target.dataset.id;

    showEditDialog({
        name,
        desc,
        id
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

function initEvents() {
    const add = document.querySelector(".add-btn");
    const table = document.querySelector(".category-table");

    add.addEventListener("click", showEditDialog);
    table.addEventListener("click", handleClick);
}

function init() {
    initEvents();
    fetchCategories();
}

init();