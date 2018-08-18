<template>
    <section class="add-edit-article">
        <div class="form-flex">
            <span class="form-label">文章标题:</span>
            <input type="text" class="v-input form-control" maxlength="20" v-model="title">
        </div>
        <div class="form-flex">
            <span class="form-label">文章分类:</span>
            <select type="text" class="v-input form-control" v-model="cls">
                <option v-for="item in classification" :key="item._id" :value="item.name">{{item.name}}</option>
            </select>
        </div>
        <div class="form-flex row-always">
            <span class="form-label">是否公开:</span>
            <div>
                <radio name="permission" value="0" v-model="secret">是</radio>
                <radio name="permission" value="1" v-model="secret">否</radio>
            </div>
        </div>
        <div class="form-flex flex-start">
            <span class="form-label">文章内容:</span>
            <div ref="editor"></div>
        </div>
        <div class="form-flex">
            <span class="form-label"></span>
            <div class="form-control">
                <v-button type="primary" :click="save">保存</v-button>
                <v-button style="margin-left: 10px;" :click="cancel">取消</v-button>
            </div>
        </div>
    </section>
</template>
<style src="./index.scss"></style>

<script>
import Radio from "../../common/radio";
import fetch from "../../common/fetch";
import { ARTICLE_CLASSIFY, ARTICLE } from "../../common/api";
import Editor from "../../common/editor";
import msgBox from "../../common/messageBox/index";
import VButton from "../../common/button";
import message from "../../common/message";
import Vue from "vue";
import Loading from "../../common/loading/index";

const _Editor = Vue.extend(Editor);

export default {
    data() {
        return {
            secret: "0",
            title: "",
            classification: [],
            cls: "",
            saved: false,
        };
    },
    components: {
        Radio,
        Editor,
        VButton
    },
    beforeRouteLeave(to, from, next) {
        if (this.saved) {
            next();
            return;
        }
        msgBox.confirm("内容没有保存，确定要离开吗?", {
            onOk: () => next(),
            onCancel: () => next(false)
        });
    },
    async created() {
        try {
            let res = await fetch(ARTICLE_CLASSIFY);
            this.classification = res;
            if (res.length) {
                this.cls = res[0].name;
            }
        } catch (err) {}
    },
    mounted() {
        const quill = new _Editor().$mount(this.$refs.editor);
        this.editor = quill.editor;
    },
    methods: {
        async save() {
            if (!this.title) {
                message.error("标题不能为空", 1.5);
                return;
            } else if (!this.cls) {
                message.error("分类不能为空", 1.5);
                return;
            } else if (!this.editor.getText().trim()) {
                message.error("内容不能为空", 1.5);
                return;
            }
            let { title, cls, secret } = this;
            try {
                Loading.show();
                await fetch(ARTICLE, {
                    method: "post",
                    body: {
                        title,
                        classification: cls,
                        secret,
                        content: this.editor.root.innerHTML
                    }
                });
                this.saved = true;
                message.success("保存成功!");
                this.cancel();
            } catch (error) {}
            Loading.hide();
        },
        cancel() {
            this.$router.push("/xsys");
        }
    }
};
</script>
