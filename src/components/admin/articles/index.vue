<template>
    <section>
        <articles :queryCallback="_fetchArticles" :total="total" routerName="adminArticles" :showPage="!!list.length">
            <ul class="list-unstyled article-list" slot="articleList">
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
        </articles>
        <div class="add-new-wrapper" ref="addWrapper">
            <v-button type="primary" class="add-new-article" @click="add">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30">
                    <path d="M832 464H560V192a48 48 0 1 0-96 0v272H192a48 48 0 1 0 0 96h272v272a48 48 0 1 0 96 0V560h272a48 48 0 1 0 0-96z"></path>
                </svg>
                <span class="add-icon"></span>
            </v-button>
        </div>
    </section>
</template>

<style src="./index.scss"></style>

<script>
import VButton from "../../common/button";
import Loading from "../../common/loading/loading";
import msgBox from "../../common/messageBox/index";
import message from "../../common/message/index";
import loadingFs from "../../common/loading/index";
import { mapState, mapActions } from "vuex";
import { FETCH_ADMIN_ARTICLE, DELETE_ARRTICLE } from "../../../stores/actions";
import { date } from "../../common/filters";
import Articles from "../../common/articles";

export default {
    components: {
        Articles,
        Loading,
        VButton
    },
    computed: {
        ...mapState({
            list: state => state.article.list,
            total: state => state.article.total,
            loaded: state => state.article.loaded
        })
    },
    beforeRouteUpdate(to, from, next) {
        let { $route } = this;
        let { page = 1, keywords = "" } = to.query;
        next();
        if (to.path === from.path) {
            this._fetchArticles(page, keywords);
        }
    },
    methods: {
        ...mapActions({
            fetchArticles: FETCH_ADMIN_ARTICLE,
            delArticle: DELETE_ARRTICLE
        }),
        _fetchArticles(page, keywords) {
            this.fetchArticles({
                page,
                keywords,
                force: true
            });
        },
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
        add() {
            this.$router.push({
                name: "addArticle"
            });
        }
    },
    filters: {
        date
    }
};
</script>

