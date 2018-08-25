<template>
    <div class="error-container">
        <img src="../../../assets/images/404.png">
        <p>抱歉,您访问的页面不存在</p>
        <div>
            <v-button type="primary" @click="toHome">返回首页</v-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .error-container {
        overflow: hidden;
        height: 100vh;
        background-color: #fff;
        color: #999;
        text-align: center;
        img {
            width: 280px;
        }
        .v-btn {
            margin-top: 30px;
        }
    }
</style>

<script>
import VButton from "../button";
export default {
    components: {
        VButton
    },
    methods: {
        toHome() {
            this.$router.push("/");
        }
    }
}
</script>
