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
    </section>
</template>

<style src="./index.scss" scoped></style>

<script>
import ArticleDetails from "../../common/articleInfo";
import fetch from "../../common/fetch";
import { PUBLIC_ARTICLE_DETAILS } from "../../common/api";
import Loading from "../../common/loading/index";
import VButton from "../../common/button";

export default {
    components: {
        VButton,
        ArticleDetails
    },
    data() {
        return {
            article: null,
            error: false
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
    },
    methods: {
        back() {
            this.$router.go(-1);
        }
    }
};
</script>

