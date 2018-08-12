<template>
    <section>
        <login :isAdmin="true"></login>
    </section>
</template>

<script>
import Login from "../../common/login";

export default {
    components: {
        Login
    }
};
</script>
