<template>
    <div class="v-form-item-wrapper" :class="{error: showError}">
        <slot></slot>
        <div class="error-msg" v-if="showError">{{errorMsg}}</div>
    </div>
</template>

<script>
import FormItem from "./formItem";

export default {
    props: {
        name: String
    },
    componentName: "formItem",
    data() {
        return {

            errorMsg: "",
            showError: false
        };
    },
    components: {
        FormItem
    },
    mounted() {
        this.$on("validate.form", this.validate);
    },
    methods: {
        validate() {
            let form = this.$parent;
            //from form rules
            let rules = form.rules[this.name];
            //from form model
            let value = form.model[this.name];
            let valid = true;
            let error;
            if (!rules.length) return true;
            for (let val of rules) {
                if (typeof val.validator === "function") {
                    valid = val.validator(value);
                    if (!valid) {
                        valid = false;
                        error = val;
                        break;
                    }
                } else {
                    if (val.required && !value) {
                        valid = false;
                        error = val;
                        break;
                    }
                }
            }
            if (this.showError = !valid) {
                this.errorMsg = error.message;
            } 
            return valid;
        }
    }
};
</script>

