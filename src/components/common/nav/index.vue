<template>
    <nav class="nav">
        <ul :class="{visible}" class="nav-menu list-unstyled" @click="hideNav">
            <slot></slot>
        </ul>
        <div class="show-nav" :class="{active: visible}" @click="showNav"></div>
        <div class="backdrop" v-if="visible" @click="showNav"></div>
        <slot name="right"></slot>
    </nav>
</template>

<style src="./index.scss"></style>

<script>
export default {
    data() {
        return {
            visible: false
        };
    },
    methods: {
        showNav() {
            this.visible = !this.visible;
        },
        hideNav(evt) {
            if (!this.visible) return;
            let target = evt.target;
            let nodeName = target.nodeName.toLowerCase();
            if (nodeName === "a" && !target.classList.contains("has-sub")) {
                this.visible = false;
            }
        }
    }
};
</script>
