<template>
    <section>
        <app-header></app-header>
        <section class="container">
            <router-view></router-view>
        </section>
    </section>
</template>
<script>
import AppHeader from "../nav";
export default {
    components: {
        AppHeader
    }
};
</script>

