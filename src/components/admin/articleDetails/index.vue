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
import { mapGetters, mapState, mapActions } from "vuex";
import { FETCH_ARTICLE_LIST } from "../../../stores/actions";

export default {
    data() {
        return {
            error: false,
            article: null
        };
    },
    computed: {
        ...mapState({
            list: state => state.article.list
        }),
        ...mapGetters({
            getArticleById: "getArticleById"
        })
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
        await this.fethList();
        Loading.hide();
        this.article = this.getArticleById(id);
    },
    methods: {
        ...mapActions({
            fethList: FETCH_ARTICLE_LIST
        })
    }
};
</script>


