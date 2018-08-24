<template>
    <div class="search-wrapper">
        <input type="text" class="v-input" v-model="keywords" placeholder="输入关键字搜索">
        <v-button type="primary" @click="handleClick">搜索</v-button>
    </div>
</template>

<style src="./index.scss"></style>

<script>
import VButton from "../button";
export default {
    props: {
        defaultValue: {
            type: String
        }
    },
    data() {
        return {
            keywords: this.defaultValue
        };
    },
    components: {
        VButton
    },
    methods: {
        handleClick() {
            this.$emit("onSearch", this.keywords);
        }
    }
}
</script>
