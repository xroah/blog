<template>
    <input :type="type" class="v-input" :value="value" @input="input" @blur="blur" @focus="focus">
</template>

<script>
export default {
    props: {
        value: String,
        type: {
            type: String,
            default: "text"
        }
    },
    mounted() {
        console.log(this)
    },
    methods: {
        input(evt) {
            this.$emit("input", evt.target.value);
        },
        focus(evt) {
            this.$emit("focus", evt);
        },
        blur(evt) {
            let { $parent } = this;
            this.$emit("blur", evt);
            if ($parent.$options.componentName === "formItem") {
                $parent.$emit("validate.form");
            }
        }
    }
};
</script>
