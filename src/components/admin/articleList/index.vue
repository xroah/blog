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
                <span class="text-ellipsis" :title="a.title">{{a.classification}}</span>
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
        <pagination :total="total" :current="page" @pageChange="pageChange"></pagination>
    </section>
</template>

<style src="./index.scss"></style>

<script>
import Loading from "../../common/loading/loading";
import msgBox from "../../common/messageBox/index";
import message from "../../common/message/index";
import loadingFs from "../../common/loading/index";
import Search from "../../common/search";
import { FETCH_ARTICLE_LIST, DELETE_ARRTICLE } from "../../../stores/actions";
import { mapState, mapActions } from "vuex";
import Pagination from "../../common/pagination";

export default {
    components: {
        Loading,
        Pagination,
        Search
    },
    data() {
        return {
            showType: false,
            totalArticles: 0,
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
        let { page = 1, keywords = "" } = $route.params;
        this.page = +page || 1;
        this.keywords = keywords;
        this.fetchArticles({
            page,
            keywords
        });
    },
    methods: {
        ...mapActions({
            fetchArticles: FETCH_ARTICLE_LIST,
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
        pageChange(page) {
            let { $router, keywords } = this;
            $router.push(`/xsys/${page}/${keywords}`);
            this.fetchArticles({
                page,
                keywords,
                force: true
            });
        },
        search(keywords) {
            let { $router } = this;
            $router.push(`/xsys/1/${keywords}`);
            this.fetchArticles({
                page: 1,
                keywords,
                force: true
            });
        }
    },
    filters: {
        date(value) {
            let date = new Date(value);
            let year = date.getFullYear();
            let mon = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            function two(num) {
                return num < 10 ? `0${num}` : num.toString();
            }
            return `${year}-${two(mon)}-${two(day)} ${two(hour)}:${two(
                min
            )}:${two(sec)}`;
        }
    }
};
</script>

