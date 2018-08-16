<template>
    <label class="radio-wrapper">
        <input 
            type="radio"
            :value="value"
            class="input-radio"
            :name="name"
            :checked="val === value"
            @change="change">
        <span class="radio-border"></span>
        <span><slot></slot></span>
    </label>
</template>

<style src="./index.scss"></style>

<script>
export default {
    model: {
        prop: "val",
        event: "change"
    },
    props: {
        name: String,
        val: String,
        value: String
    },
    methods: {
        change(evt) {
            this.$emit("change", evt.target.value);
        }
    }
}
</script>


