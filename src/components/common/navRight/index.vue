<template>
    <div class="right-user" slot="right" v-if="loggedIn">
        <a href="#" @click.stop.prevent="toggleDropdown" class="toggle-dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" version="1.1" p-id="4297" width="32" height="32">
                <path d="M512 64.3c-247.3 0-447.8 199.8-447.8 446.2 0 1.1 0 2.2 0.1 3.3 0 0.6-0.1 1.3-0.1 1.9 0 2.7 0.2 5.4 0.2 8.1v1c4.9 240.5 202.6 434.7 445 434.7 101.6 0 195.3-34.1 270.3-91.4v0.2c109.3-81.4 180-211.3 180-357.7 0.1-246.5-200.4-446.3-447.7-446.3z m7.5 274.9c73.6 0 133.3 59.5 133.3 132.8 0 73.3-59.7 132.8-133.3 132.8S386.3 545.4 386.3 472c0-73.3 59.6-132.8 133.2-132.8zM268.7 821l82.5-128c21.9-33.9 59.5-54.4 100-54.4h134.5c41.7 0 80.3 21.7 101.8 57.3L758.9 814c-67.6 56.3-154.6 90.2-249.4 90.2-90.9 0.1-174.5-31.1-240.8-83.2z" />
            </svg>
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
            loggedIn: false
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
                this.toLogins();
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


