<template>
    <section class="add-edit-article" v-if="!error">
        <div class="form-flex">
            <span class="form-label">文章标题:</span>
            <input type="text" class="v-input form-control" maxlength="20" placeholder="最多20个字" v-model="title">
        </div>
        <div class="form-flex">
            <span class="form-label">文章分类:</span>
            <div class="form-control classification">
                <select class="v-input" ref="firstLevel" v-model="cls">
                    <option v-for="item in classification" :key="item._id" :value="item._id">{{item.name}}</option>
                </select>
                <select class="v-input" ref="secondLevel" v-model="subCls">
                    <option v-for="item in subClass[cls]" :key="item._id" :value="item._id">{{item.name}}</option>
                </select>
            </div>
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
        <upload-img></upload-img>
    </section>
    <section class="text-center" v-else>文章不存在</section>
</template>
<style src="./index.scss"></style>

<script>
import Radio from "../../common/radio";
import Editor from "../../common/editor";
import msgBox from "../../common/messageBox/index";
import VButton from "../../common/button";
import UploadImg from "../uploadImg";
import message from "../../common/message";
import Vue from "vue";
import Loading from "../../common/loading/index";
import Tags from "../tags";
import fetch from "../../common/fetch";
import { ARTICLE_DETAILS } from "../../common/api";
import {
    ADD_ARTICLE,
    FETCH_CLASSIFICATION_LIST
} from "../../../stores/actions";
import { mapState, mapActions } from "vuex";

const _Editor = Vue.extend(Editor);

export default {
    components: {
        Radio,
        Editor,
        VButton,
        Tags,
        UploadImg
    },
    data() {
        return {
            secret: "0",
            title: "",
            cls: "",
            subCls: "",
            saved: false,
            error: false,
            tags: []
        };
    },
    computed: {
        ...mapState({
            classification: state => state.classification.list,
            subClass: state => state.classification.subList
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
        if (!this.classification.length) {
            Loading.show();
            //fetch when refresh
            await this.fetchCls();
            Loading.hide();
        }
        let { classification, subClass } = this;
        //classifction may empty(no permissions)
        if (classification.length && !this.cls) {
            this.cls = classification[0]._id;
            if (Object.keys(subClass).length) {
                this.subCls = subClass[this.cls][0]._id;
            }
        }
    },
    mounted() {
        if (this.error) return;
        //we can get $refs instance just when mounted
        const quill = new _Editor().$mount(this.$refs.editor);
        this.editor = quill.editor;
        this.editMode && this.handleEdit();
    },
    methods: {
        //when page refresh classification list will be null,
        //so fetch first
        ...mapActions({
            addArticle: ADD_ARTICLE,
            fetchCls: FETCH_CLASSIFICATION_LIST
        }),
        async handleEdit() {
            let article;
            Loading.show();
            try {
                let ret = await fetch(`${ARTICLE_DETAILS}/${this.id}/true`);
                article = ret.article;
            } catch (err) {}
            Loading.hide();
            if (!article) {
                this.error = true;
                return;
            }
            this.title = article.title;
            this.cls = article.firstLevelId;
            this.subCls = article.secondLevelId;
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
        getSelectedText(select) {
            if (select.selectedOptions) {
                return select.selectedOptions[0].text;
            }
            let index = select.selectedIndex;
            return select.options[index].text;
        },
        async save() {
            if (!this.title) {
                message.error("标题不能为空", 1.5);
                return;
            } else if (!this.cls || !this.subCls) {
                message.error("分类不能为空", 1.5);
                return;
            } else if (!this.editor.getText().trim()) {
                message.error("内容不能为空", 1.5);
                return;
            }
            let {
                title,
                cls,
                secret,
                editMode,
                id,
                editor,
                tags,
                subCls,
                $refs,
                getSelectedText
            } = this;
            let method = "post";
            let body = {
                //for search by classification id(when delete a classifcation)
                firstLevelId: cls,
                secondLevelId: subCls,
                firstLevelName: getSelectedText($refs.firstLevel),
                secondLevelName: getSelectedText($refs.secondLevel),
                title,
                secret,
                tags,
                content: editor.root.innerHTML,
                summary: editor.getText().substr(0, 100)
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
            this.$router.push({ name: "adminArticles" });
        }
    }
};
</script>
