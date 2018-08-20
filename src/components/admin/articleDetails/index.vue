<template>
    <section class="article-details" v-if="!error">
        <article-info :article="details.article"/>
    </section>
    <section class="text-center" v-else>文章不存在</section>
</template>

<style src="./index.scss"></style>

<script>
import fetch from "../../common/fetch";
import ArticleInfo from "../../common/articleInfo";
import { ARTICLE_DETAILS } from "../../common/api";
import Loading from "../../common/loading/index";

export default {
    data() {
        return {
            error: false,
            details: {}
        }
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
        try {
           let res = await fetch(`${ARTICLE_DETAILS}?id=${id}`);
           this.details = res;
        } catch (error) {
            
        }
        Loading.hide();
    }
}
</script>


