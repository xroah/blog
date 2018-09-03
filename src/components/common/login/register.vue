<template>
    <section class="login-container">
        <transition name="fade-in-half">
            <div class="mask" v-show="focused"></div>
        </transition>
        <div class="login-box">
            <div class="input-wrapper">
                <input type="text" v-model="userName" @keypress.enter="keypress" placeholder="请输入用户名">
            </div>
            <div class="input-wrapper">
                <input type="text" v-model="email"  @keypress.enter="keypress" placeholder="请输入正确的邮箱,帮助找回密码">
            </div>
            <div class="input-wrapper">
                <input type="password" v-model="password"  @keypress.enter="keypress" placeholder="请输入密码,6-20位字符">
            </div>
            <div class="input-wrapper">
                <input type="password" v-model="confirm"  @keypress.enter="keypress" placeholder="重复密码">
            </div>
            <v-button type="primary" @click="clickHandler">注册</v-button>
            <!-- use href directly will refresh the page-->
            <a href="#" class="f-r" @click.prevent="toLogin">已有账号,去登录>></a>
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
import { DAILY_SENTENCE, USER_LOGIN } from "../api";
import Background from "../background";

const SAVE_USER_KEY = "userInfo";

export default {
    props: {
        isAdmin: Boolean
    },
    data() {
        return {
            userName: "",
            password: "",
            focused: false,
            confirm: "",
            email: ""
        };
    },
    components: {
        VButton,
        Checkbox,
        Background
    },
    methods: {
        clickHandler() {

        },
        keypress() {

        },
        toLogin() {
            this.$router.push({
                name: "userLogin"
            });
        }
    }
};
</script>

