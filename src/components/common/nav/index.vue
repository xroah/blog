<template>
    <nav class="nav">
        <ul :class="{visible}" class="nav-menu list-unstyled" @click="hideNav">
            <slot></slot>
        </ul>
        <div class="show-nav" :class="{active: visible}" @click="showNav"></div>
    </nav>
</template>

<style src="./index.scss"></style>

<script>
export default {
    data() {
        return {
            visible: false
        }
    },
    methods: {
        showNav() {
            this.visible = !this.visible;
        },
        hideNav() {
            if (!this.visible) return;
            this.visible = false;
        }
    }
}
</script>
