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
                <div class="input-wrapper border-none id-code">
                    <form-item name="idCode">
                        <v-input type="text" v-model="model.idCode" placeholder="请输入验证码" />
                    </form-item>
                    <img class="code-img" title="看不清?点击换一张" :src="codeImg" @click="getCode">
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
import { USER_REGISTER, GET_ID_CODE } from "../api";
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
            codeImg: "",
            model: {
                userName: "",
                email: "",
                password: "",
                confirm: "",
                idCode: ""
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
                    },
                    {
                        validator: this.validPwd,
                        message: "密码格式不对(6-20位)"
                    }
                ],
                confirm: [
                    {
                        required: true,
                        message: "请重复输入密码"
                    },
                    {
                        validator: this.validPwd,
                        message: "密码格式不对(6-20位)"
                    },
                    {
                        validator: () => {
                            return this.model.password === this.model.confirm;
                        },
                        message: "两次密码输入不一致"
                    }
                ],
                idCode: [
                    {
                        required: true,
                        message: "请输入验证码"
                    },
                    {
                        validator(value) {
                            return value.length === 4;
                        },
                        message: "验证码格式不正确"
                    }
                ]
            }
        };
    },
    created() {
        this.getCode();
    },
    methods: {
        async clickHandler() {
            let { $refs, model } = this;
            let valid = $refs.form.validate();
            if (valid) {
                loading.show();
                try {
                    await fetch(USER_REGISTER, {
                        method: "post",
                        body: {
                            userName: model.userName,
                            password: md5(model.password),
                            email: model.email,
                            idCode: model.idCode
                        }
                    });
                    message.success("注册成功");
                    this.$router.push({
                        name: "publicArticles"
                    });
                } catch (error) {}
                loading.hide();
            }
        },
        validPwd(value) {
            let len = value.length;
            return len >= 6 && len <= 20;
        },
        getCode() {
            fetch(GET_ID_CODE).then(ret => (this.codeImg = ret));
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

