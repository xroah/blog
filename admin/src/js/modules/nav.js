import defineEl from "./utils/defineEl.js";
import request from "./request.js";
import { ADMIN_LOGOUT, CHANGE_PASSWORD } from "./api.js";
import message from "./message.js";
import md5 from "./md5.js";
import dialog from "./dialog.js";

class SysNav extends HTMLElement {

    constructor() {
        super();

        request("/templates/nav.html")
            .then(this.init.bind(this))
    }

    init(html) {
        let shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = html;

        const links = shadowRoot.querySelectorAll(".item-list a");
        const pathname = location.pathname;

        for (let a of links) {
            if (
                (
                    a.classList.contains("home") &&
                    (
                        pathname === "/" ||
                        pathname === "/index.html"
                    )
                ) ||
                a.pathname === pathname
            ) {
                a.classList.add("active")
            }
        }

        this.initEvents();
    }

    initEvents() {
        const exit = this.shadowRoot.getElementById("exit");
        const pwd = this.shadowRoot.getElementById("changePwd");

        exit.addEventListener("click", this.logout);
        pwd.addEventListener("click", this.showPasswordDialog);
    }

    showPasswordDialog = () => {
        const tpl = this.shadowRoot.getElementById("pwdForm").innerHTML;

        dialog.confirm(
            tpl,
            {
                title: "修改密码",
                async onOk() {
                    const origEl = this.el.querySelector("#origPwd");
                    const newEl = this.el.querySelector("#newPwd");
                    const confirmEl = this.el.querySelector("#confirm");
                    const origPwd = origEl.value;
                    const newPwd = newEl.value;
                    const confirm = confirmEl.value;

                    message.destroy();

                    if (!origPwd || !newPwd || !confirm) {
                        if (!origPwd) {
                            message.error("请输入原密码");
                            origEl.focus();
                        } else if (!newPwd) {
                            message.error("请输入新密码");
                            newEl.focus();
                        } else {
                            message.error("请确认密码")
                            confirmEl.focus();
                        }

                        return Promise.reject();
                    }

                    if (newPwd !== confirm) {
                        message.error("新密码和确认密码不一致!")

                        return Promise.reject();
                    }

                    await request(CHANGE_PASSWORD, {
                        method: "post",
                        body: JSON.stringify({
                            origPwd: md5(origPwd),
                            newPwd: md5(newPwd)
                        })
                    });

                    message.success("修改成功!");
                }
            }
        )
    }

    logout = async () => {
        message.destroy();

        dialog.confirm(
            "确定要退出吗？",
            {
                async onOk() {
                    try {
                        await request(ADMIN_LOGOUT, {
                            method: "post"
                        })
                    } catch (error) {
                        return;
                    }

                    message.success("退出成功!");

                    setTimeout(() => location.assign("/login.html"), 500);
                }
            }
        )
    }

}

defineEl("sys-nav", SysNav);