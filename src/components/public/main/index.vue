<template>
    <section>
        <app-header></app-header>
        <router-view></router-view>
    </section>
</template>
<script>
import AppHeader from "../header";
export default {
    components: {
        AppHeader,
    }
}
</script>

