<template>
    <button 
    :type="htmlType" 
    :class="type ? `v-btn-${type}` : ''" 
    class="v-btn"
    @click="click()">{{text}}</button>
</template>
<style lang="scss" src="./index.scss"></style>
<script>
export default {
    props: {
        text: String,
        type: String,
        htmlType: String,
        click: Function
    }
}
</script>


