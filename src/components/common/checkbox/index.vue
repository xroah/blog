<template>
    <label class="checkbox-wrapper">
        <input
         type="checkbox" 
        :checked="checked"
        v-model="check"
        value="1"
         class="input-checkbox"
         @change="change"/>
        <span class="checkbox-outer"></span>
        <span>{{text}}</span>
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
    props: ["text", "checked"],
    methods: {
        change() {
            this.$emit("onChange", this.check);
        }
    }
};
</script>

