<template>
    <section class="main">
        <search :defaultValue="keywords"></search>
        <Item v-for="article in list" :key="article._id" :summary="article.summary" :totalViewed="article.totalViewed"></Item>
        <div class="text-center" v-if="loaded && !list.length">无数据</div>
        <pagination v-if="list.length" :current="page" :total="total"></pagination>
    </section>
</template>
<style lang="scss" src="./index.scss">
</style>
<script>
import Item from "./item";
import pagination from "../../common/pagination";
import { FETCH_PUBLIC_ARTICLE } from "../../../stores/actions";
import { mapState, mapActions } from "vuex";
import Loading from "../../common/loading/index";
import Search from "../../common/search";

export default {
    components: {
        Item,
        pagination,
        Search
    },
    data() {
        return {
            page: 1,
            keywords: ""
        };
    },
    created() {
        let { $route } = this;
        let { page = 1, keywords = "" } = $route.query;
        this.page = +page || 1;
        this.keywords = keywords;
        this._fetchArticles(page, keywords);
    },
    computed: {
        ...mapState({
            list: state => state.adminArticle.list,
            total: state => state.adminArticle.total,
            loaded: state => state.adminArticle.loaded
        })
    },
    methods: {
        ...mapActions({
            fetchArticles: FETCH_PUBLIC_ARTICLE
        }),
        _fetchArticles(page, keywords) {
            Loading.show();
            this.fetchArticles({
                page,
                keywords,
                force: true
            });
            Loading.hide();
        },
        queryChange(page, keywords) {
            let { $router } = this;
            $router.push({
                name: "adminArticles",
                query: {
                    page,
                    keywords
                }
            });
            this._fetchArticles(page, keywords);
        }
    }
};
</script>
