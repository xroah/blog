<template>
    <label class="radio-wrapper">
        <input 
            type="radio"
            v-model="check"
            :value="value"
            class="input-radio"
            :name="name"
            @change="change($event)">
        <span class="radio-border">

        </span><slot></slot>
    </label>
</template>

<style src="./index.scss"></style>

<script>
export default {
    props: ["name", "onChange", "checked", "value"],
    data() {
        return {
            check: this.checked
        }
    },
    methods: {
        change() {
            this.$emit("onChange", this.check);
        }
    }
}
</script>


