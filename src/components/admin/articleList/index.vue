<template>
    <section class="article-summary">
        <search :defaultValue="keywords" @onSearch="search"></search>
        <ul class="list-unstyled article-list">
            <li>
                <span>文章标题</span>
                <span>文章分类</span>
                <span>是否公开</span>
                <span>创建时间</span>
                <span>查看次数</span>
                <span>操作</span>
            </li>
            <li v-for="a in list" :key="a._id">
                <span class="text-ellipsis" :title="a.title">{{a.title}}</span>
                <span class="text-ellipsis" :title="a.title">{{a.secondLevelName}}</span>
                <span>{{a.secret === "0" ? "是" : "否"}}</span>
                <span>{{a.createTime | date}}</span>
                <span>{{a.totalViewed}}</span>
                <span>
                    <a href="#" @click="operate($event, 'details', a._id)">详情</a>
                    <a href="#" @click="operate($event, 'edit', a._id)">编辑</a>
                    <a href="#" class="del" @click="operate($event, 'del', a._id)">删除</a>
                </span>
            </li>
            <li v-if="loaded && !list.length">
                <span>无数据</span>
            </li>
            <li class="justify-center" v-if="!loaded">
                <loading :fullscreen="false">正在加载...</loading>
            </li>
        </ul>
        <pagination v-show="list.length" :total="total" :current="page" @pageChange="pageChange"></pagination>
    </section>
</template>

<style src="./index.scss"></style>

<script>
import Loading from "../../common/loading/loading";
import msgBox from "../../common/messageBox/index";
import message from "../../common/message/index";
import loadingFs from "../../common/loading/index";
import Search from "../../common/search";
import { DELETE_ARRTICLE, FETCH_ADMIN_ARTICLE } from "../../../stores/actions";
import { mapState, mapActions } from "vuex";
import Pagination from "../../common/pagination";
import { date } from "../../common/filters";

export default {
    components: {
        Loading,
        Pagination,
        Search
    },
    data() {
        return {
            page: 1,
            keywords: ""
        };
    },
    computed: {
        ...mapState({
            list: state => state.article.list,
            total: state => state.article.total,
            loaded: state => state.article.loaded
        })
    },
    created() {
        let { $route } = this;
        let { page = 1, keywords = "" } = $route.query;
        this.page = +page || 1;
        this.keywords = keywords;
        this.fetchArticles({
            page,
            keywords
        });
    },
    methods: {
        ...mapActions({
            fetchArticles: FETCH_ADMIN_ARTICLE,
            delArticle: DELETE_ARRTICLE
        }),
        operate(evt, type, id) {
            switch (type) {
                case "del":
                    this.del(id);
                    break;
                case "details":
                    this.$router.push(`/xsys/article/details/${id}`);
                    break;
                case "edit":
                    this.$router.push(`/xsys/article/edit/${id}`);
                    break;
            }
            evt.preventDefault();
        },
        del(id) {
            msgBox.confirm("确定要删除这条记录吗?", async () => {
                loadingFs.show();
                try {
                    await this.delArticle(id);
                    message.success("删除成功");
                } catch (error) {}
                loadingFs.hide();
            });
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
            this.fetchArticles({
                page,
                keywords,
                force: true
            });
        },
        pageChange(page) {
           this.queryChange(page, this.keywords);
        },
        search(keywords) {
            this.queryChange(1, keywords);
        }
    },
    filters: {
        date
    }
};
</script>

