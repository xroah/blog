<template>
    <section>
        <article-list></article-list>
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
import NavBar from "../nav";
import ArticleList from "../articleList";
export default {
    components: {
        VButton,
        NavBar,
        ArticleList
    },
    data() {
        return {
            articles: [],
            loaded: false,
        };
    },
    created() {
    },
    methods: {
        add() {
            this.$router.push({
                name: "addArticle"
            });
        }
    }
};
</script>

