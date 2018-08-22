<template>
    <section class="add-edit-article" v-if="!error">
        <div class="form-flex">
            <span class="form-label">文章标题:</span>
            <input type="text" class="v-input form-control" maxlength="20" placeholder="最多20个字" v-model="title">
        </div>
        <div class="form-flex">
            <span class="form-label">文章分类:</span>
            <select type="text" class="v-input form-control" v-model="cls">
                <option v-for="item in classification" :key="item._id" :value="item.name">{{item.name}}</option>
            </select>
        </div>
        <div class="form-flex">
            <span class="form-label">文章标签:</span>
            <tags class="form-control" ref="articleTags" @addTag="addTag" @removeTag="removeTag" :tags="tags"></tags>
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
import Tags from "../tags";
import {
    FETCH_ARTICLE_LIST,
    ADD_ARTICLE,
    FETCH_CLASSIFICATION_LIST
} from "../../../stores/actions";
import { mapState, mapActions, mapGetters } from "vuex";

const _Editor = Vue.extend(Editor);

export default {
    components: {
        Radio,
        Editor,
        VButton,
        Tags
    },
    data() {
        return {
            secret: "0",
            title: "",
            cls: "",
            saved: false,
            error: false,
            tags: []
        };
    },
    computed: {
        ...mapState({
            list: state => state.article.list,
            article: state => state.article.current,
            classification: state => state.classification.list
        }),
        ...mapGetters({
            getArticleById: "getArticleById"
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
        Loading.show();
        //fetch when refresh
        await this.fetchCls();
        Loading.hide();
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
        async handleEdit() {
            Loading.show();
            //fetch when refresh
            await this.fetchArticles();
            Loading.hide();
            let article = this.getArticleById(this.id);
            if (!article) {
                this.error = true;
                return;
            }
            this.title = article.title;
            this.cls = article.classification;
            this.secret = article.secret;
            this.editor.root.innerHTML = article.content;
            this.tags = article.tags || [];
        },
        addTag(tag) {
            this.tags.push(tag);
        },
        removeTag(index) {
            this.tags.splice(index, 1);
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
            let { title, cls, secret, editMode, id, editor, tags } = this;
            let method = "post";
            let body = {
                title,
                classification: cls,
                secret,
                tags,
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
