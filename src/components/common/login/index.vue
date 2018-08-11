<template>
    <section>
        <div class="login-bg" ref="bg"></div>
        <div class="login-box">
            <p class="daily-sentence" :title="note" v-text="sentence"></p>
            <div class="input-wrapper">
                <input 
                    type="text" 
                    @focus="focusHandler($event)"
                    @blur="focusHandler($event)"
                    v-model="userName"
                    placeholder="用户名">
            </div>
            <div class="input-wrapper">
                <input
                    type="password"
                    v-model="password"
                    @focus="focusHandler($event)"
                    @blur="focusHandler($event)"
                    placeholder="密码">
            </div>
            <v-button type="primary" :click="clickHandler" text="登录"></v-button>
        </div>
        <a :title="copyright" v-if="show" class="copyright">
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1050" xmlns:xlink="http://www.w3.org/1999/xlink" width="36" height="36"><path d="M512 958.016C266.08 958.016 65.984 757.952 65.984 512 65.984 266.08 266.08 65.984 512 65.984c245.952 0 446.016 200.064 446.016 446.016C958.016 757.952 757.952 958.016 512 958.016zM512 129.984C301.344 129.984 129.984 301.344 129.984 512c0 210.624 171.36 382.016 382.016 382.016 210.624 0 382.016-171.36 382.016-382.016C894.016 301.344 722.624 129.984 512 129.984z"></path><path d="M512 304m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z"></path><path d="M512 768c-17.664 0-32-14.304-32-32l0-288c0-17.664 14.336-32 32-32s32 14.336 32 32l0 288C544 753.696 529.664 768 512 768z"></path></svg>
        </a>
    </section>
</template>
<style src="./index.scss" lang="scss"></style>
<script>
import VButton from "../button";
import fetch from "../fetch.js";
export default {
    props: ["click"],
    data() {
        return {
            sentence: "",
            note: "",
            copyright: "",
            show: false,
            userName: "",
            password: ""
        };
    },
    components: {
        VButton
    },
    created() {
        fetch("/api/thirdParty/daliySentence")
            .then(data => {
                this.sentence = data.content;
                this.note = `${data.note}(来自金山词霸每日一句。)`;
            })
            .catch(() => {});
    },
    mounted() {
        fetch("/api/thirdParty/dailyPicture")
            .then(data => {
                if (!data && !data.images && !data.images.length) return;
                let img = data.images[0];
                let url = img.url;
                this.copyright = `${img.copyright}--Bing每日图片`;
                this.$refs.bg.style.backgroundImage = `url(//cn.bing.com${url}),radial-gradient(circle at left top, #3c3b52 0%, #252233 80%)`;
                this.show = true;
            })
            .catch(() => {});
    },
    methods: {
        focusHandler($evt) {
            let target = $evt.target;
            let parent = target.parentNode;
            let bg = this.$refs.bg;
            if ($evt.type === "focus") {
                parent.classList.add("focused");
                bg.classList.add("focused");
            } else {
                parent.classList.remove("focused");
                bg.classList.remove("focused");
            }
        },
        clickHandler() {
          let { click, userName, password } = this;
            click(userName, password);
        }
    }
};
</script>

