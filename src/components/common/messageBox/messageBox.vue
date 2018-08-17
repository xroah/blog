<template>
    <div class="message-box-wrapper">
        <div class="message-box">
            <div class="message-box-header">
                <strong>提示</strong>
                <span class="message-box-close" @click="cancel">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2194" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M156.067114 217.937163l61.86318-61.86318 649.988128 649.988128-61.86318 61.86318-649.988128-649.988128Z"></path><path d="M806.062428 156.067114l61.86318 61.86318-649.988128 649.988128-61.86318-61.86318 649.988128-649.988128Z"></path></svg>
                </span>
            </div>
            <div class="message-box-content">
                {{msg}}
            </div>
            <div class="message-box-footer">
                <v-button v-if="showCancel" style="margin-right: 10px;" :click="cancel">取消</v-button>
                <v-button type="primary"  :click="ok">确定</v-button>
            </div>
        </div>
    </div>
</template>
<style src="./index.scss"></style>

<script>
import VButton from "../button"
export default {
    components: {
        VButton
    },
    created() {
        document.addEventListener("keydown", this.keydown)
    },
    destroyed() {
        this.onClose();
        document.removeEventListener("keydown", this.keydown)
    },
    mounted() {
        this.onShow();
    },
    methods: {
        ok() {
            this.onOk();
            this.destroy();
        },
        destroy() {
            let el = this.$el;
            let parent = el.parentNode;
            for (let child of this.$children) {
                child.$destroy();
            }
            this.$destroy();
            parent.removeChild(el);
        },
        cancel() {
            this.onCancel();
            this.destroy();
        },
        keydown(evt) {
            let key = evt.key.toLowerCase();
            if (key === "escape") {
               this.cancel();
            }
        }
    }
};
</script>
