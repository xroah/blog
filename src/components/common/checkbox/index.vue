<template>
    <label class="checkbox-wrapper">
        <input
         type="checkbox" 
         class="input-checkbox"
         :checked="checked"
         @change="change"/>
        <span class="checkbox-outer"></span>
        <slot></slot>
    </label>
</template>
<style lang="scss" src="./index.scss"></style>
<script>
export default {
    model: {
        prop: "checked",
        event: "change"
    },
    props: {
        checked: Boolean
    },
    methods: {
        change(evt) {
            this.$emit("change", evt.target.checked);
        }
    }
};
</script>

