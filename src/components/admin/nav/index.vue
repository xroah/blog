<template>
    <v-nav>
        <li>
            <router-link to="/xsys/article" class="nav-link" active-class="active">文章</router-link>
        </li>
        <li>
            <router-link exact to="/xsys/classify" class="nav-link" active-class="active">分类管理</router-link>
        </li>
        <li>
            <a href="#" class="nav-link has-sub" @click.prevent="toggleSub">系统管理</a>
            <ul class="sub-nav">
                <li>
                    <router-link exact to="/xsys/mng/modifyPwd" class="nav-link">修改密码</router-link>
                </li>
            </ul>
        </li>
    </v-nav>
</template>

<script>
import VNav from "../../common/nav";
export default {
    components: {
        VNav
    },
    methods: {
        toggleSub(evt) {
            let target = evt.target;
            let next = target.nextElementSibling;
            let display = getComputedStyle(next).getPropertyValue("display");
            if (display === "none") {
                next.style.display = "block";
            } else {
                next.style.display = "none";
            }
        }
    }
};
</script>


