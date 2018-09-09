<template>
    <div class="right-user" slot="right" v-if="loggedIn">
        <a href="#" @click.stop.prevent="toggleDropdown" class="toggle-dropdown">
            <img class="avatar" :src="avantar">
        </a>
        <transition name="slide-fade-in">
            <ul class="dropdown" v-show="dropdownVisible" @click="handleClick">
                <li>
                    <a href="#" class="nav-link" data-type="pwd">修改密码</a>
                </li>
                <li v-if="!isAdmin">
                    <a href="#" class="nav-link" data-type="info">个人信息</a>
                </li>
                <li>
                    <a href="#" class="nav-link" data-type="out">退出</a>
                </li>
            </ul>
        </transition>
    </div>
    <div class="right-user" slot="right" v-else>
        <a href="javascript:;" @click="toLogin">登录</a>
        <a href="javascript:;" style="margin-left:10px;" @click="toRegister" v-if="!isAdmin">注册</a>
    </div>
</template>

<style src="./index.scss"></style>

<script>
import fetch from "../../common/fetch";
import { USER_LOGOUT, GET_LOGIN_STATUS } from "../../common/api";
import avantar from "../../../assets/images/avatar.png";

export default {
    props: {
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dropdownVisible: false,
            loggedIn: false,
            avantar
        };
    },
    async created() {
        try {
            let ret = await fetch(GET_LOGIN_STATUS);
            this.loggedIn = ret.loggedIn;
        } catch (error) {}
        document.addEventListener("click", this.clickOutSide);
    },
    destroyed() {
        document.removeEventListener("click", this.clickOutSide);
    },
    methods: {
        clickOutSide(evt) {
            if (!this.dropdownVisible) return;
            this.dropdownVisible = false;
        },
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
        toRegister() {
            this.$router.push({
                name: "userRegister"
            });
        },
        toLogin() {
            this.$router.push({
                name: this.isAdmin ? "adminLogin" : "userLogin"
            });
        },
        async logout() {
            try {
                await fetch(USER_LOGOUT, {
                    method: "post"
                });
                this.toLogin();
            } catch (err) {}
        },
        handleClick(evt) {
            let target = evt.target;
            let nodeName = target.nodeName.toLowerCase();
            if (nodeName === "a") {
                let type = target.dataset.type;
                switch (type) {
                    case "pwd":
                        this.$router.push({
                            name: this.isAdmin
                                ? "adminModifyPwd"
                                : "userModifyPwd"
                        });
                        break;
                    case "out":
                        this.logout();
                        break;
                }
                evt.preventDefault();
            }
        }
    }
};
</script>


