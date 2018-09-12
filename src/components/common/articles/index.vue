<template>
    <section class="article-summary">
        <search :keywords="keywords" @onSearch="search"></search>
        <slot name="articleList"></slot>
        <pagination v-show="showPage" :total="total" :current="page" @pageChange="pageChange"></pagination>
    </section>
</template>

<style src="./index.scss"></style>

<script>
import Search from "../../common/search";
import Pagination from "../../common/pagination";
import { mapState } from "vuex";

export default {
    components: {
        Pagination,
        Search
    },
    computed: {
        ...mapState({
            page: state => state.article.current,
            keywords: state => state.article.keywords
        })
    },
    props: {
        routerName: {
            type: String
        },
        queryCallback: {
            type: Function,
            required: true
        },
        total: {
            type: Number
        },
        showPage: {
            type: Boolean,
            default: true
        }
    },
    created() {
        let { $route } = this;
        let { page = 1, keywords = "" } = $route.query;
        
        this.queryCallback(page, keywords);
    },
    methods: {
        queryChange(page, keywords) {
            let { $router, routerName } = this;
            $router.push({
                name: routerName,
                query: {
                    page,
                    keywords
                }
            });
        },
        pageChange(page) {
            this.queryChange(page, this.keywords);
        },
        search(keywords) {
            this.queryChange(1, keywords);
        }
    }
};
</script>

