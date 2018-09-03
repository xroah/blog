<template>
    <transition name="rotate-y-reverse">
        <login/>
    </transition>
</template>

<script>
import Login from "../../common/login";
import Background from "../../common/background";

export default {
    components: {
        Login,
        Background
    }
}
</script>

