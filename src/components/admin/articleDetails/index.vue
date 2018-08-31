<template>
    <section class="article-details" v-if="!error">
        <article-info :article="article" />
    </section>
    <section class="text-center" v-else>文章不存在</section>
</template>

<style src="./index.scss"></style>

<script>
import fetch from "../../common/fetch";
import ArticleInfo from "../../common/articleInfo";
import Loading from "../../common/loading/index";
import { ARTICLE_DETAILS } from "../../common/api";

export default {
    data() {
        return {
            article: null,
            error: false
        };
    },
    components: {
        ArticleInfo
    },
    async created() {
        Loading.show();
        try{
            let ret = await fetch(`${ARTICLE_DETAILS}/${id}`);
            this.article = article;
        }catch(err){
            this.error = true;
        }
        Loading.hide();
    },
    methods: {
        
    }
};
</script>


