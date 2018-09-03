<template>
    <transition name="rotate-y">
        <Register/>
    </transition>
</template>

<script>
import Register from "../../common/login/register";
import Background from "../../common/background";

export default {
    components: {
        Register,
        Background
    }
}
</script>

