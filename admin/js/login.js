
import request from "./modules/request.js";
import loading from "./modules/loading.js";
import message from "./modules/message.js";
import { 
    ADMIN_LOGIN,
    FETCH_BG
 } from "./modules/api.js";

const form = document.forms["loginForm"];
const elements = form.elements;
const btn = elements.login;
const usernameInput = elements.username;
const passwordInput = elements.password;
const savedUsername = localStorage.getItem("username");

if (savedUsername) {
    elements.username.value = savedUsername;
    elements.remember.checked = true;
}

async function fetchBg() {
    let bg;

    try {
        bg = await request(FETCH_BG);        
    } catch (error) {
        return;
    }

    const bgEl = document.querySelector(".background");
    const crEl = document.querySelector(".copyright");

    bgEl.style.backgroundImage = `url(${bg.url})`;
    crEl.innerHTML = bg.copyright || "";
}

function handleFocus(evt) {
    const bgEl = document.querySelector(".background");
    const target = evt.target;

    if (
        target === usernameInput ||
        target === passwordInput
    ) {
        if (evt.type === "focusin") {
            bgEl.style.filter = "blur(3px)";
        } else {
            bgEl.style.filter = "blur(0)";
        }
    }
}

function handleKeydown(evt) {
    const target = evt.target;

    if (evt.key.toLowerCase() !== "enter") return;

    if (
        target === usernameInput || 
        target === passwordInput
    ) {
        login();
    }
}

function validate() {
    const username = elements.username.value.trim();
    const password = elements.password.value;

    message.destroy();

    if (!username) {
        message.error("请输入用户名！");
        elements.username.focus();

        return false;
    }

    if (!password) {
        message.error("请输入密码！");
        elements.password.focus();

        return false;
    }

    return true;
}

async function login (){
    const username = elements.username.value.trim();
    const password = elements.password.value;
    let res;

    if (!validate()) return;

    btn.disabled = true;

    loading.show();
    try {
        res = await request(ADMIN_LOGIN, {
            method: "POST",
            body: JSON.stringify({
                username,
                password: md5(password)
            })
        });
    } catch (error) {

        return;
    } finally {
        btn.disabled = false;

        loading.hide();
    }

    if (elements.remember.checked) {
        localStorage.setItem("username", username);
    } else {
        localStorage.removeItem("username");
    }

    localStorage.setItem("token", res.token);
    location.assign("index.html");
}

fetchBg();

form.addEventListener("focusin", handleFocus);
form.addEventListener("focusout", handleFocus);
form.addEventListener("keydown", handleKeydown);
btn.addEventListener("click", login);