<template>
    <div class="v-tag" v-on="$listeners">
        <slot></slot>
        <span v-if="closable" class="v-tag-close" @click="close">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" version="1.1" p-id="2007" width="8" height="8"><path d="M505.173333 416.426666 122.88 27.306666c-27.306667-27.306667-68.266667-27.306667-102.4 0l0 0c-27.306667 27.306667-27.306667 68.266667 0 102.4L409.6 512l-389.12 389.12c-27.306667 27.306667-27.306667 68.266667 0 102.4l0 0c27.306667 27.306667 68.266667 27.306667 102.4 0l389.12-389.12 389.12 389.12c27.306667 27.306667 68.266667 27.306667 102.4 0l0 0c27.306667-27.306667 27.306667-68.266667 0-102.4L607.573333 512l389.12-389.12c27.306667-27.306667 27.306667-68.266667 0-102.4l0 0c-27.306667-27.306667-68.266667-27.306667-102.4 0L505.173333 416.426666 505.173333 416.426666z" /></svg>
        </span>
    </div>
</template>
<style src="./index.scss"></style>

<script>
export default {
    props: {
        closable: Boolean,
        text: String
    },
    destroyed() {
        this.$emit("closed", this.text);
    },
    methods: {
        close() {
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
        }
    }
};
</script>

