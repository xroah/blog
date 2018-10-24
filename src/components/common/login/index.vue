<template>
    <section class="login-container">
        <transition name="fade-in-half">
            <div class="mask" v-show="focused"></div>
        </transition>
        <div class="login-box">
            <p class="daily-sentence" :title="note" v-text="sentence"></p>
            <div class="input-wrapper">
                <input type="text" class="border-none" v-model="userName" @focus="focusHandler($event)" @blur="focusHandler($event)" @keypress.enter="keypress" placeholder="用户名或邮箱">
            </div>
            <div class="input-wrapper">
                <input type="password" class="border-none" v-model="password" @focus="focusHandler($event)" @blur="focusHandler($event)" @keypress.enter="keypress" placeholder="密码">
            </div>
            <div class="input-wrapper border-none id-code" v-if="showCode">
                <input v-model="code" type="text" class="v-input" placeholder="请输入验证码">
                <img class="code-img" title="看不清?点击换一张" :src="codeImg" @click="getCode">
            </div>
            <div class="remember">
                <checkbox v-model="remember">记住我</checkbox>
                <a href="#" class="f-r" @click.prevent="toPwd" v-if="!isAdmin">忘记密码</a>
            </div>
            <v-button type="primary" @click="clickHandler">登录</v-button>
            <!-- use href directly will refresh the page-->
            <a href="#" class="f-r" @click.prevent="toRegister" v-if="!isAdmin">没有账号,去注册>></a>
        </div>
    </section>
</template>
<style src="./index.scss"></style>
<script>
import VButton from "../button";
import fetch from "../fetch.js";
import message from "../message/index";
import Checkbox from "../checkbox";
import md5 from "blueimp-md5";
import loading from "../loading/index";
import { DAILY_SENTENCE, USER_LOGIN, GET_ID_CODE } from "../api";
import Background from "../background";

const SAVE_USER_KEY = "userInfo";

export default {
    props: {
        isAdmin: Boolean
    },
    data() {
        return {
            sentence: "",
            note: "",
            userName: "",
            password: "",
            remember: false,
            focused: false,
            showCode: false,
            codeImg: "",
            code: ""
        };
    },
    components: {
        VButton,
        Checkbox,
        Background
    },
    async created() {
        let needCode = !!JSON.parse(localStorage.getItem("needLoginCode"));
        if (needCode) {
            this.refreshCode();
        }
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
            let { login, userName, password, showCode, code } = this;
            if (showCode && code.length !== 4) {
                message.error("验证码格式不正确(4位字符)");
                return;
            }
            login();
        },
        keypress() {
            this.clickHandler();
        },
        refreshCode() {
            this.showCode = true;
            this.getCode();
        },
        getCode() {
            fetch(GET_ID_CODE).then(ret => (this.codeImg = ret));
        },
        login() {
            let {userName, password, showCode, idCode} = this;
            message.destroy();
            if (!userName || !password) {
                message.error("用户名和密码都不能为空!");
                return;
            }
            let _password = md5(password);
            loading.show();
            fetch(USER_LOGIN, {
                method: "post",
                body: {
                    userName,
                    password: _password,
                    idCode,
                    needCode: showCode
                }
            })
                .then(() => {
                    message.success("登录成功", 1.5);
                    this.saveInfo(userName, password);
                    if (this.isAdmin) {
                        this.$router.push({
                            name: "adminArticles"
                        });
                    } else {
                        this.$router.push({
                            name: "publicHome"
                        });
                    }
                    localStorage.removeItem("needLoginCode");
                    loading.hide();
                })
                .catch(rej => {
                    loading.hide();
                    if (rej && rej.needCode) {
                        localStorage.setItem(
                            "needLoginCode",
                            JSON.stringify(true)
                        );
                        this.refreshCode();
                    }
                });
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
        },
        toRegister() {
            this.$router.push({
                name: "userRegister"
            });
        },
        toPwd() {}
    }
};
</script>

