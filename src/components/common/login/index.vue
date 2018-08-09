<template>
    <section>
        <div class="login-box">
            <div class="input-wrapper">
                <input 
                    type="text" 
                    @focus="focusHandler($event)"
                    @blur="focusHandler($event)"
                    placeholder="用户名">
            </div>
            <div class="input-wrapper">
                <input
                    type="password"
                    @focus="focusHandler($event)"
                    @blur="focusHandler($event)"
                    placeholder="密码">
            </div>
            <v-button type="primary" :click="login" text="登录"></v-button>
        </div>
    </section>
</template>
<style src="./index.scss" lang="scss"></style>
<script>
import VButton from "../button";
export default {
    components: {
        VButton
    },
    created() {
        
    },
    methods: {
        focusHandler($evt) {
            let target = $evt.target;
            let parent = target.parentNode;
            if ($evt.type === "focus") {
                parent.classList.add("focused");
            } else {
                parent.classList.remove("focused");
            }
        },
        login() {
console.log("login")
        }
    }
}
</script>

