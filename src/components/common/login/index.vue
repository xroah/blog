<template>
    <section>
        <background :class="{focused}"></background>
        <div class="login-box">
            <p class="daily-sentence" :title="note" v-text="sentence"></p>
            <div class="input-wrapper">
                <input type="text" v-model="userName" @focus="focusHandler($event)" @blur="focusHandler($event)" @keypress.enter="keypress" placeholder="用户名">
            </div>
            <div class="input-wrapper">
                <input type="password" v-model="password" @focus="focusHandler($event)" @blur="focusHandler($event)" @keypress.enter="keypress" placeholder="密码">
            </div>
            <div class="remember">
                <checkbox v-model="remember">记住我</checkbox>
            </div>
            <v-button type="primary" @click="clickHandler">登录</v-button>
        </div>
    </section>
</template>
<style src="./index.scss" lang="scss"></style>
<script>
import VButton from "../button";
import fetch from "../fetch.js";
import message from "../message/index";
import Checkbox from "../checkbox";
import md5 from "blueimp-md5";
import loading from "../loading/index";
import { DAILY_SENTENCE, USER_LOGIN } from "../api";
import Background from "../background";

const SAVE_USER_KEY = "userInfo";

export default {
    props: ["isAdmin"],
    data() {
        return {
            sentence: "",
            note: "",
            userName: "",
            password: "",
            remember: false,
            focused: false
        };
    },
    components: {
        VButton,
        Checkbox,
        Background
    },
    async created() {
        this.getInfo();
        try {
            let data = await fetch(DAILY_SENTENCE);
            this.sentence = data.content;
            this.note = `${data.note}(金山词霸每日一句)`;
        } catch (error) {}
    },
    methods: {
        focusHandler($evt) {
            let target = $evt.target;
            let parent = target.parentNode;
            let bg = this.$refs.bg;
            (this.focused = $evt.type === "focus")
                ? parent.classList.add("focused")
                : parent.classList.remove("focused");
        },
        clickHandler() {
            let { login, userName, password } = this;
            login(userName, password);
        },
        keypress() {
            this.clickHandler();
        },
        async login(userName, password) {
            message.destroy();
            if (!userName || !password) {
                message.error("用户名和密码都不能为空!");
                return;
            }
            let _password = md5(password);
            loading.show();
            try {
                await fetch(USER_LOGIN, {
                    method: "post",
                    body: {
                        userName,
                        password: _password
                    }
                });
                loading.hide();
                message.success("登录成功", 1.5);
                this.saveInfo(userName, password);
                if (this.isAdmin) {
                    this.$router.push({ name: "adminArticles" });
                }
            } catch (error) {
                loading.hide();
            }
        },
        //save password and username to localstorage
        saveInfo(uname, pwd) {
            //if the remember checkbox did not checked, revmove the saved info
            if (!this.remember) {
                localStorage.removeItem(SAVE_USER_KEY);
                return;
            }
            let userName = btoa(uname);
            let password = btoa(pwd);
            localStorage.setItem(
                SAVE_USER_KEY,
                JSON.stringify({
                    userName,
                    password
                })
            );
        },
        getInfo() {
            let info = localStorage.getItem(SAVE_USER_KEY);
            if (info) {
                info = JSON.parse(info);
                this.userName = atob(info.userName);
                this.password = atob(info.password);
                this.remember = true;
            }
        }
    }
};
</script>

