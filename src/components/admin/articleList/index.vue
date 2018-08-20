<template>
    <section class="article-summary">
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
                    <a href="#">详情</a>
                    <a href="#" @click="edit($event, a._id)">编辑</a>
                    <a href="#" class="del" @click="del($event, a._id)">删除</a>
                </span>
            </li>
            <li v-if="loaded && !list.length">
                <span>无数据</span>
            </li>
            <li class="justify-center" v-if="!loaded">
                <loading :fullscreen="false">正在加载...</loading>
            </li>
        </ul>
    </section>
</template>

<style src="./index.scss"></style>

<script>
import Loading from "../../common/loading/loading";
import msgBox from "../../common/messageBox/index";
import message from "../../common/message/index";
import loadingFs from "../../common/loading/index";
import { FETCH_ARTICLE_LIST, DELETE_ARRTICLE } from "../../../stores/actions";
import { mapState, mapActions } from "vuex";

export default {
    components: {
        Loading
    },
    data() {
        return {
            showType: false
        };
    },
    computed: {
        ...mapState({
            list: state => state.article.list,
            loaded: state => state.article.loaded
        })
    },
    created() {
        this.fetchArticles();
    },
    methods: {
        ...mapActions({
            fetchArticles: FETCH_ARTICLE_LIST,
            delArticle: DELETE_ARRTICLE
        }),
        del(evt, id) {
            evt.preventDefault();
            msgBox.confirm("确定要删除这条记录吗?", async () => {
                loadingFs.show();
                try {
                    await this.delArticle(id);
                    message.success("删除成功");
                } catch (error) {}
                loadingFs.hide();
            });
        },
        edit(evt, id) {
            evt.preventDefault();
            this.$router.push(`/xsys/article/edit/${id}`);
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

