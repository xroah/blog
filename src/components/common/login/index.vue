<template>
    <section>
        <div class="login-box">
            <p class="daily-sentence" :title="note" v-text="sentence"></p>
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
            <v-button type="primary" :click="click" text="登录"></v-button>
        </div>
    </section>
</template>
<style src="./index.scss" lang="scss"></style>
<script>
import VButton from "../button";
export default {
  props: ["click"],
  data() {
      return {
          sentence: "",
          note: ""
      }
  },
  components: {
    VButton
  },
  created() {
    fetch("/api/thirdParty/daliySentence", {
      method: "get"
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res);
    }).then(data => {
        this.sentence = data.content;
        this.note = `${data.note}(来自金山词霸每日一句。)`;
    }).catch(() => {});
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
    }
  }
};
</script>

