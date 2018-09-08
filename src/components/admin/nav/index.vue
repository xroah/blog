<template>
    <v-nav>
        <li>
            <router-link to="/xsys/article" class="nav-link" active-class="active">文章</router-link>
        </li>
        <li>
            <router-link exact to="/xsys/classify" class="nav-link" active-class="active">分类管理</router-link>
        </li>
        <nav-right slot="right" :isAdmin="true"></nav-right>
    </v-nav>
</template>

<script>
import VNav from "../../common/nav";
import NavRight  from "../../common//navRight/";

export default {
    components: {
        VNav,
        NavRight
    }
};
</script>


