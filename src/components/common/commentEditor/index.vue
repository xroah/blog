<template>
    <div class="comment-editor-wrapper">
        <div class="comment-editor">
            <textarea class="v-input" v-model="content"></textarea>
            <v-button type="primary" @click="ok">确定</v-button>
            <v-button style="margin-left: 10px;" v-if="showCancel" @click="cancel">取消</v-button>
        </div>
    </div>
</template>

<style src="./index.scss"></style>


<script>
import VButton from "../../common/button";
import message from "../message/index";

export default {
    props: {
        showCancel: {
            type: Boolean,
            default: false
        },
        replyTo: String
    },
    data() {
        return {
            content: ""
        };
    },
    components: {
        VButton
    },
    methods: {
        ok() {
            let { content, replyTo } = this;
            if (!content.trim()) {
                message.destroy();
                message.error("请输入内容");
                return;
            }
            this.$emit("ok", {
                ref: this,
                content,
                replyTo
            });
        },
        cancel() {
            this.$emit("cancel");
        }
    }
};
</script>