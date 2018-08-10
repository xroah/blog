<template>
    <section>
        <div class="login-bg"></div>
        <login :click="login"></login>
    </section>
</template>

<style lang="scss">
    .login-bg {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: #282537;
        background-image: radial-gradient(top, circle cover, #3c3b52 0%, #252233 80%);
    }

</style>

<script>
    import Login from "../../common/login";
    export default {
        components: {
            Login
        },
        methods: {
            login() {
                
            }
        }
    };
</script>
