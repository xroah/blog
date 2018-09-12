<template>
    <section class="article-container">
        <div v-if="!error">
            <article-details :article="article"></article-details>
        </div>
        <div class="text-center error-wrapper" v-else>
            <img src="../../../assets/images/no_article.png">
            <p class="error-msg">抱歉,文章不存在!</p>
            <v-button type="primary" @click="back">返回</v-button>
        </div>
        <div class="comments-editor-wrapper">
            <span>发表评论</span>
            <comment-editor/>
        </div>
        <div class="all-comments-wrapper">
            <span>所有评论</span>
            <div class="comments-list">
                <comment-item userName="嘻嘻嘻嘻" />
            </div>
        </div>
        <modal :visible.sync="showModal" class="info-modal" title="补全信息">
            <div class="info-row">
                <label><span class="red">*</span>您的姓名</label>
                <input type="text" class="v-input" placeholder="请输入您的姓名(必填)" v-model="name">
            </div>
            <div class="info-row">
                <label><span class="red">*</span>您的邮箱</label>
                <input type="text" class="v-input" placeholder="请输入您的邮箱(必填,不公开)" v-model="email">
            </div>
            <div class="info-row">
                <label>您的网站</label>
                <input type="text" class="v-input" placeholder="请输入您的网站">
            </div>
            <v-button type="primary">确定</v-button>
            <span class="error-msg red" v-show="!!errorMsg">{{errorMsg}}</span>
        </modal>
    </section>
</template>

<style src="./index.scss" scoped></style>

<script>
import ArticleDetails from "../../common/articleInfo";
import fetch from "../../common/fetch";
import { PUBLIC_ARTICLE_DETAILS, UPDATE_VIEWED_TIMES } from "../../common/api";
import Loading from "../../common/loading/index";
import VButton from "../../common/button";
import CommentItem from "../../common/commentItem";
import CommentEditor from "../../common/commentEditor";
import Modal from "../../common/modal";

export default {
    components: {
        VButton,
        ArticleDetails,
        CommentEditor,
        CommentItem,
        Modal
    },
    data() {
        return {
            article: null,
            error: false,
            showModal: false,
            errorMsg: "",
            name: "",
            email: ""
        };
    },
    async created() {
        let { id } = this.$route.params;
        Loading.show();
        try {
            let ret = await fetch(`${PUBLIC_ARTICLE_DETAILS}/${id}`);
            this.article = ret.article;
        } catch (error) {
            this.error = true;
        }
        Loading.hide();
        fetch(UPDATE_VIEWED_TIMES, {
            method: "post",
            body: {
                id
            }
        });
    },
    methods: {
        back() {
            this.$router.go(-1);
        }
    }
};
</script>

