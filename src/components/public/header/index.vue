<template>
    <v-nav>
        <li>
            <router-link class="nav-link" exact active-class="active" to="/">首页</router-link>
        </li>
        <li>
            <router-link class="nav-link" exact active-class="active" to="/about">关于我</router-link>
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


