<template>
    <section class="article-info" v-if="article">
        <div class="article-title">{{article.title}}</div>
        <div class="base-info">发布于{{article.createTime | convertDate}},归类于{{article.clsName}}。阅读{{article.totalViewed}}次,今日{{article.todayViewed}}次</div>
        <div class="article-content" v-html="article.content"></div>
    </section>
</template>

<style src="./index.scss"></style>

<script>
export default {
    props: {
        article: Object
    },
    filters: {
        convertDate(date) {
            date = new Date(date);

            let year = date.getFullYear();
            let mon = date.getMonth() + 1;
            let day = date.getDate();
            let week = date.getDay();
            let hour = date.getHours();
            let min = date.getMinutes();
            let weekArr = ["日", "一", "二", "三", "四", "五", "六"];
            week = weekArr[week];
            function two (num) {
                return num < 10 ? "0" + num : num;
            }
            return `${year}年${mon}月${day}日,星期${week},${two(hour)}:${two(min)}`;
        }
    }
}
</script>


