<template>
    <section>
        <div class="login-bg"></div>
        <login></login>
    </section>
</template>

<style lang="scss">
    .login-bg {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

</style>

<script>
    import Login from "../../common/login";
    export default {
        components: {
            Login
        }
    };
</script>
