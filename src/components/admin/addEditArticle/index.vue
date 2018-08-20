<template>
    <section class="add-edit-article" v-if="!error">
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
                <v-button type="primary" @click="save">保存</v-button>
                <v-button style="margin-left: 10px;" @click="cancel">取消</v-button>
            </div>
        </div>
    </section>
    <section class="text-center" v-else>文章不存在</section>
</template>
<style src="./index.scss"></style>

<script>
import Radio from "../../common/radio";
import Editor from "../../common/editor";
import msgBox from "../../common/messageBox/index";
import VButton from "../../common/button";
import message from "../../common/message";
import Vue from "vue";
import Loading from "../../common/loading/index";
import {
    FETCH_ARTICLE_LIST,
    ADD_ARTICLE,
    FETCH_CLASSIFICATION_LIST
} from "../../../stores/actions";
import { mapState, mapActions } from "vuex";

const _Editor = Vue.extend(Editor);

export default {
    components: {
        Radio,
        Editor,
        VButton
    },
    data() {
        return {
            secret: "0",
            title: "",
            cls: "",
            saved: false,
            error: false
        };
    },
    computed: {
        ...mapState({
            list: state => state.article.list,
            article: state => state.article.current,
            classification: state => state.classification.list
        })
    },
    beforeRouteLeave(to, from, next) {
        if (this.saved || this.error) {
            next();
            return;
        }
        msgBox.confirm("内容没有保存，确定要离开吗?", {
            onOk: () => next(),
            onCancel: () => next(false)
        });
    },
    async created() {
        let { $route } = this;
        //edit mode(if the path has 'edit')
        this.editMode = $route.path.includes("edit");
        this.id = $route.params.id;
        //if edit mode and no id provided(input the url manually with no id)
        if (this.editMode && !this.id) {
            this.error = true;
            return;
        }
        await this.fetchCls();
        let { classification } = this;
        if (classification.length && !this.cls) {
            this.cls = classification[0].name;
        }
    },
    mounted() {
        //we can get $refs instance just when mounted
        const quill = new _Editor().$mount(this.$refs.editor);
        this.editor = quill.editor;
        this.editMode && this.handleEdit();
    },
    methods: {
        //when page refresh article list will be null,
        //so fetch first
        ...mapActions({
            fetchArticles: FETCH_ARTICLE_LIST,
            addArticle: ADD_ARTICLE,
            fetchCls: FETCH_CLASSIFICATION_LIST
        }),
        getArticleById(id) {
            let ret;
            for (let value of this.list) {
                if (value._id === id) {
                    ret = value;
                    break;
                }
            }
            return ret;
        },
        async handleEdit() {
            if (!this.list.length) {
                await this.fetchArticles();
            }
            let article = this.getArticleById(this.id);
            if (!article) {
                this.error = true;
                return;
            }
            this.title = article.title;
            this.cls = article.classification;
            this.secret = article.secret;
            this.editor.root.innerHTML = article.content;
        },
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
            let { title, cls, secret, editMode, id, editor } = this;
            let method = "post";
            let body = {
                title,
                classification: cls,
                secret,
                content: editor.root.innerHTML
            };
            if (editMode) {
                body.id = id;
                method = "put";
            }
            Loading.show();
            try {
                await this.addArticle({
                    method,
                    body
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
