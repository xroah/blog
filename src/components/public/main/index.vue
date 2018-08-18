<template>
    <section>
        <app-header></app-header>
        <section class="container">
            <router-view></router-view>
        </section>
    </section>
</template>
<script>
import AppHeader from "../header";
export default {
    components: {
        AppHeader
    }
};
</script>

