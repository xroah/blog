<template>
    <articles :queryCallback="_fetchArticles" :total="total" routerName="publicArticles" :showPage="!!list.length">
        <div class="article-list" slot="articleList">
            <loading v-show="!loaded"/>
            <Item v-for="article in list" :id="article._id" :key="article._id" :summary="article.summary" :totalViewed="article.totalViewed"></Item>
            <div class="text-center" v-if="error">
                <img src="../../../assets/images/500.png">
                <p class="error-msg">出错啦,等会再试试吧</p>
            </div>
            <div class="text-center" v-else-if="loaded && !list.length">
                <img src="../../../assets/images/no_result.png">
                <p class="error-msg">没有搜到结果,换个词试试吧</p>
            </div>
        </div>
    </articles>
</template>

<style src="./index.scss"></style>
<style  scoped>
.error-msg {
    margin-top: 10px;
    color: #666;
}
</style>


<script>
import Item from "./item";
import { FETCH_PUBLIC_ARTICLE } from "../../../stores/actions";
import { mapState, mapActions } from "vuex";
import Loading from "../../common/loading/loading";
import Articles from "../../common/articles";

export default {
    components: {
        Item,
        Articles,
        Loading
    },
    beforeRouteUpdate(to, from, next) {
        let { $route } = this;
        let { page = 1, keywords } = to.query;
        next();
        if (to.path === from.path) {
            this._fetchArticles(page, keywords);
        }
    },
    computed: {
        ...mapState({
            list: state => state.article.list,
            total: state => state.article.total,
            loaded: state => state.article.loaded,
            error: state => state.article.error
        })
    },
    methods: {
        ...mapActions({
            fetchArticles: FETCH_PUBLIC_ARTICLE
        }),
        _fetchArticles(page, keywords) {
            this.fetchArticles({
                page,
                keywords,
                force: true
            });
        }
    }
};
</script>
