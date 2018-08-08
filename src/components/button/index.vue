<template>
    <button 
    :type="htmlType" 
    :class="[type ? `v-btn-${type}` : '']" 
    class="v-btn"
    @touchstart="touchStart()" 
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
    },
    methods: {
        touchStart() {} //button bind touchstart, let css active state be normal
    }
}
</script>


