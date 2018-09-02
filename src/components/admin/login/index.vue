<template>
    <section>
        <background/>
        <login :isAdmin="true"></login>
    </section>
</template>

<script>
import Login from "../../common/login";
import Background from "../../common/background";

export default {
    components: {
        Login,
        Background
    }
};
</script>
