<template>
    <section class="admin-main">
        <nav-bar></nav-bar>
        <section class="container">
            <router-view></router-view>
        </section>
    </section>
</template>

<script>
import NavBar from "../nav";
export default {
    components: {
        NavBar
    }
}
</script>

