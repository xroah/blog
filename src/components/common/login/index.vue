<template>
    <section>
        <div class="login-box">
            <div class="input-wrapper">
                <input type="text" placeholder="用户名">
            </div>
            <div class="input-wrapper">
                <input type="password" placeholder="密码">
            </div>
            <v-button type="primary" text="登录"></v-button>
        </div>
    </section>
</template>
<style src="./index.scss" lang="scss"></style>
<script>
import VButton from "../button";
export default {
    components: {
        VButton
    }
}
</script>

