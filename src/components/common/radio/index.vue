<template>
    <label class="radio-wrapper">
        <input 
            type="radio"
            :value="value"
            :checked="checked"
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
    methods: {
        change() {
            this.$emit("onChange", this.value);
            console.log(this.value)
        }
    }
}
</script>


