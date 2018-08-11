<template>
    <section>
        <login :click="login"></login>
    </section>
</template>

<script>
import Login from "../../common/login";
import fetch from "../../common/fetch";
import message from "../../common/message/index.js"

export default {
    components: {
        Login
    },

    methods: {
        async login(userName, password) {
            // message.destroy();
            message.success("成功");
            return;
            try {
                await fetch("/api/login", {
                    method: "post",
                    body: {
                        userName,
                        password
                    }
                });
            } catch (err) {}
        }
    }
};
</script>
