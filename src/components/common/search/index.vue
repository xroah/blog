<template>
    <div class="search-wrapper">
        <input type="text" class="v-input" @keydown.enter="handleClick" ref="input" :value="keywords" placeholder="输入关键字搜索">
        <v-button type="primary" @click="handleClick">搜索</v-button>
    </div>
</template>

<style src="./index.scss"></style>

<script>
import VButton from "../button";
export default {
    props: {
        keywords: {
            type: String
        }
    },
    components: {
        VButton
    },
    methods: {
        handleClick() {
            this.$emit("onSearch", this.$refs.input.value);
        }
    }
}
</script>
