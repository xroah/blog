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
            error: false,
            article: null
        };
    },
    components: {
        ArticleInfo
    },
    async created() {
        let id = this.$route.params.id;
        if (!id) {
            this.error = true;
            return;
        }
        Loading.show();
        try{
            let ret = await fetch(`${ARTICLE_DETAILS}/${id}`);
            this.article = ret.article;
        }catch(err){}
        Loading.hide();
    },
    methods: {
        
    }
};
</script>


