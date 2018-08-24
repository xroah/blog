<template>
    <section class="root">
        <router-view></router-view>
        <transition name="slide-in-out">
            <v-button class="back-to-top" v-if="showToTop" @click="toTop">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30"><path d="M472.064 272.448l-399.232 399.232c-22.08 22.08-22.08 57.792 0 79.872 22.016 22.016 57.792 22.08 79.872 0L512 392.256l359.296 359.296c22.016 22.016 57.792 22.08 79.872 0 22.08-22.08 22.016-57.792 0-79.872L551.936 272.448C529.856 250.432 494.144 250.432 472.064 272.448z"></path></svg>   
        </v-button>
        </transition>
    </section>
</template>

<style lang="scss" src="./index.scss"></style>

<script>
import VButton from "../common/button";

let timer;

export default {
    data() {
        return {
            showToTop: false
        };
    },
    components: {
        VButton
    },
    created() {
        window.addEventListener("scroll", this.onSroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.onSroll);
    },
    methods: {
        showButton() {
            let top =
                document.body.scrollTop || document.documentElement.scrollTop;
            let winH = window.innerHeight;
            if (top > winH) {
                this.showToTop = true;
            } else {
                this.showToTop = false;
            }
        },
        onSroll() {
            const DELAY = 300;
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(this.showButton, DELAY);
        },
        toTop() {
            let body = document.body;
            let html = document.documentElement;
            let _this = this;
            console.log(111)
            function _toTop() {
                let top = body.scrollTop || html.scrollTop;
                top -= top / 12;
                if (top > 0) {
                    requestAnimationFrame(_toTop);
                } else {
                    _this.showToTop = false;
                }
                body.scrollTop = top;
                html.scrollTop = top;
            }
            _toTop();
        }
    }
};
</script>
