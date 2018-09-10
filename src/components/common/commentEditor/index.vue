<template>
    <div class="comment-editor-wrapper">
        <div class="comment-editor">
            <textarea class="v-input" v-model="content"></textarea>
            <v-button type="primary" @click="ok">确定</v-button>
            <v-button style="margin-left: 10px;" v-if="showCancel" @click="cancel">取消</v-button>
        </div>
        <modal :visible.sync="showModal" class="info-modal" title="补全信息">
            <div class="info-row">
                <label><span class="red">*</span>您的姓名</label>
                <input type="text" class="v-input" placeholder="请输入您的姓名(必填)">
            </div>
            <div class="info-row">
                <label><span class="red">*</span>您的邮箱</label>
                <input type="text" class="v-input" placeholder="请输入您的邮箱(必填)">
            </div>
            <div class="info-row">
                <label>您的网站</label>
                <input type="text" class="v-input" placeholder="请输入您的网站">
            </div>
            <v-button type="primary">确定</v-button>
            <span class="error-msg red">请输入姓名</span>
        </modal>
    </div>
</template>

<style src="./index.scss"></style>


<script>
import VButton from "../../common/button";
import message from "../message/index";
import Modal from "../modal";

export default {
    props: {
        showCancel: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            content: "",
            showModal: false
        };
    },
    components: {
        VButton,
        Modal
    },
    methods: {
        ok() {
            this.showModal = true;
            if (!this.content.trim()) {
                message.destroy();
                message.error("请输入内容");
                return;
            }
            this.$emit("ok");
        },
        cancel() {
            this.$emit("cancel");
        }
    }
};
</script>