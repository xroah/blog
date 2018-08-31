<template>
    <section class="main">
        <search :defaultValue="keywords" @onSearch="search"></search>
        <Item v-for="article in list" :key="article._id" :summary="article.summary" :totalViewed="article.totalViewed"></Item>
        <div class="text-center" v-if="loaded && !list.length">无数据</div>
        <pagination v-if="list.length" @pageChange="pageChange" :current="page" :total="total"></pagination>
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
        this.updateList();
    },
    beforeRouteUpdate(to, from, next) {
        let { $route } = this;
        next();
        if ($route.path === "/article") {
            this.updateList();
        }
    },
    computed: {
        ...mapState({
            list: state => state.article.list,
            total: state => state.article.total,
            loaded: state => state.article.loaded
        })
    },
    methods: {
        ...mapActions({
            fetchArticles: FETCH_PUBLIC_ARTICLE
        }),
        updateList() {
            let { page = 1, keywords = "" } = this.$route.query;
            this.page = +page || 1;
            this.keywords = keywords;
            this._fetchArticles(page, keywords);
        },
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
                name: "publicArticles",
                query: {
                    page,
                    keywords
                }
            });
        },
        search(keywords) {
            this.queryChange(1, keywords);
        },
        pageChange(page) {
            this.queryChange(page, this.keywords);
        }
    }
};
</script>
