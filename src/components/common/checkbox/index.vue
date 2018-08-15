<template>
    <label class="checkbox-wrapper">
        <input
         type="checkbox" 
         :checked="checked"
         v-model="check"
         class="input-checkbox"
         @change="change"/>
        <span class="checkbox-outer"></span>
        <slot></slot>
    </label>
</template>
<style lang="scss" src="./index.scss"></style>
<script>
export default {
    data() {
        return {
            check: this.checked
        }
    },
    props: ["checked"],
    methods: {
        change() {
            this.$emit("onChange", this.check);
        }
    }
};
</script>

