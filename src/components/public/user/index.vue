<template>
    <section class="user-container">
        <background/>
        <router-view/>
    </section>
</template>

<style>
    .user-container {
        overflow: hidden;
        height: 100vh;
        perspective: 1000px;
    }
</style>


<script>
import Background from "../../common/background";

export default {
    components: {
        Background
    }
}
</script>
