<template>
    <v-nav>
        <li>
            <router-link class="nav-link" exact active-class="active" to="/">首页</router-link>
        </li>
        <li>
            <router-link class="nav-link" active-class="active" to="/article">文章</router-link>
        </li>
        <li>
            <router-link class="nav-link" exact active-class="active" to="/about">关于我</router-link>
        </li>
        <div slot="right">
           <a href="javascript:;" @click="login('userLogin')">登录</a>
           &nbsp;/&nbsp;
           <a href="javascript:;" @click="login('userRegister')">注册</a>
        </div>
    </v-nav>
</template>

<script>
import VNav from "../../common/nav";
export default {
    components: {
        VNav
    },
    methods: {
        login(name) {
            this.$router.push({
                name
            });
        }
    }
};
</script>


