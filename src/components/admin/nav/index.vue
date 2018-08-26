<template>
    <v-nav>
        <li>
            <router-link to="/xsys/article" class="nav-link" active-class="active">文章</router-link>
        </li>
        <li>
            <router-link exact to="/xsys/classify" class="nav-link" active-class="active">分类管理</router-link>
        </li>
    </v-nav>
</template>

<script>
import VNav from "../../common/nav";
export default {
    components: {
        VNav
    }
};
</script>


