<template>
    <section>
        <app-header></app-header>
        <router-view></router-view>
    </section>
</template>

<style lang="scss" src="./index.scss"></style>


<script>
import AppHeader from "../header";
export default {
  components: {
    AppHeader
  }
};
</script>
