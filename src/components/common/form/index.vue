<template>
    <form class="v-form">
        <slot></slot>
    </form>
</template>

<style src="./index.scss"></style>

<script>
export default {
    props: {
        model: {
            type: Object,
            required: true
        },
        rules: {
            type: Object,
            required: true
        }
    },
    mounted() {
        console.log(this.$children);
    },
    methods: {
        validate() {
            let fields = this.$children;
            let vCount = 0;
            fields.forEach(field => {
                if (field.validate()) {
                    vCount++;
                }
            });
            return vCount === fields.length;
        }
    }
};
</script>

