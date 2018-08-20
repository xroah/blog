<template>
    <button 
        :type="htmlType"
        :class="type ? `v-btn-${type}` : ''" 
        class="v-btn" v-on="$listeners">
        <slot></slot>
    </button>
</template>
<style lang="scss" src="./index.scss"></style>
<script>
export default {
    props: {
        type: String,
        htmlType: String
    }
};
</script>


