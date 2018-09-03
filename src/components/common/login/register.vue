<template>
    <section class="login-container">
        <transition name="fade-in-half">
            <div class="mask" v-show="focused"></div>
        </transition>
        <div class="login-box"  @focusin="focus" @focusout="focus">
            <v-form :model="model" :rules="rules" ref="form">
                <div class="input-wrapper border-none">
                    <form-item name="userName">
                        <v-input v-model="model.userName" placeholder="请输入用户名" />
                    </form-item>
                </div>
                <div class="input-wrapper border-none">
                    <form-item name="email">
                        <v-input v-model="model.email" placeholder="请输入邮箱,帮助找回密码" />
                    </form-item>
                </div>
                <div class="input-wrapper border-none">
                    <form-item name="password">
                        <v-input type="password" v-model="model.password" placeholder="请输入密码,6-20位字符" />
                    </form-item>
                </div>
                <div class="input-wrapper border-none">
                    <form-item name="confirm">
                        <v-input type="password" ref="confirm" v-model="model.confirm" placeholder="请重复输入密码" />
                    </form-item>
                </div>
            </v-form>
            <v-button type="primary" @click="clickHandler">注册</v-button>
            <!-- use href directly will refresh the page-->
            <a href="#" class="f-r" @click.prevent="toLogin">已有账号,去登录>></a>
        </div>
    </section>
</template>
<style src="./index.scss"></style>
<script>
import VButton from "../button";
import fetch from "../fetch";
import message from "../message/index";
import md5 from "blueimp-md5";
import loading from "../loading/index";
import { USER_REGISTER } from "../api";
import Background from "../background";
import VInput from "../input";
import VForm from "../form";
import FormItem from "../form/formItem";

const SAVE_USER_KEY = "userInfo";

export default {
    props: {
        isAdmin: Boolean
    },
    components: {
        VButton,
        Background,
        VInput,
        VForm,
        FormItem
    },
    data() {
        return {
            focused: false,
            model: {
                userName: "",
                email: "",
                password: "",
                confirm: ""
            },
            rules: {
                userName: [
                    {
                        required: true,
                        message: "请输入用户名"
                    }
                ],
                email: [
                    {
                        validator(value) {
                            return /^[\w.-]+@[a-z\d-_]+(?:\.[a-z\d]+)+$/i.test(
                                value
                            );
                        },
                        message: "请输入正确的邮箱地址"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码"
                    }
                ],
                confirm: [
                    {
                        required: true,
                        message: "请重复输入密码"
                    },
                    {
                        validator: () => {
                            return this.model.password === this.model.confirm;
                        },
                        message: "两次密码输入不一致"
                    }
                ]
            }
        };
    },
    methods: {
        clickHandler() {
            let {$refs, model} = this;
            let valid = $refs.form.validate();
        },
        focus(evt) {
            let tgt = evt.target;
            let nodeName = tgt.nodeName.toLowerCase();
            if (nodeName === "input") {
                let confirm = this.$refs.confirm;
                this.focused = evt.type === "focusin";
                if (evt.type === "focusout" && confirm.value) {
                    confirm.blur();
                }
            }
        },
        keypress() {},
        toLogin() {
            this.$router.push({
                name: "userLogin"
            });
        }
    }
};
</script>

