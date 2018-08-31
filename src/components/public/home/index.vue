<template>
    <articles :queryCallback="_fetchArticles" :total="total" routerName="publicArticles" :showPage="!!list.length">
        <div slot="articleList">
            <Item v-for="article in list" :id="article._id" :key="article._id" :summary="article.summary" :totalViewed="article.totalViewed"></Item>
            <div class="text-center" v-if="loaded && !list.length">无数据</div>
        </div>
    </articles>
</template>
<style lang="scss" src="./index.scss">
</style>
<script>
import Item from "./item";
import { FETCH_PUBLIC_ARTICLE } from "../../../stores/actions";
import { mapState, mapActions } from "vuex";
import Loading from "../../common/loading/index";
import Articles from "../../common/articles";

export default {
    components: {
        Item,
        Articles
    },
    beforeRouteUpdate(to, from, next) {
        let { $route } = this;
        let { page = 1, keywords = "" } = to.query;
        next();
        if (to.path === from.path) {
            this._fetchArticles(page, keywords);
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
        _fetchArticles(page, keywords) {
            Loading.show();
            this.fetchArticles({
                page,
                keywords,
                force: true
            });
            Loading.hide();
        }
    }
};
</script>
