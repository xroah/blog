<template>
    <v-nav>
        <li>
            <router-link class="nav-link" exact-active-class="active" to="/">首页</router-link>
        </li>
        <li>
            <router-link class="nav-link" active-class="active" to="/article">文章</router-link>
        </li>
        <li>
            <router-link class="nav-link" exact-active-class="active" to="/about">关于我</router-link>
        </li>
        <nav-right slot="right"></nav-right>
    </v-nav>
</template>

<script>
import VNav from "../../common/nav";
import NavRight from "../../common/navRight/";

export default {
    components: {
        VNav,
        NavRight
    },
    methods: {}
};
</script>


