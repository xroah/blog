<template>
    <div class="loading-wrapper" :class="fullscreen ? 'loading-fullscreen' : ''">
        <div class="center-box" v-if="fullscreen">
            <div class="rotate">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
            </div>
        </div>
        <div v-else>
            <span class="loading-spinner"></span>
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script>
export default {
   props: {
       fullscreen: {
           default: true
       }
   } 
}
</script>


