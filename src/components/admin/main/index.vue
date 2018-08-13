<template>
    <section class="container">
        <section class="articles-content"></section>
        <v-button type="primary" class="add-new-article">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30"><path d="M832 464H560V192a48 48 0 1 0-96 0v272H192a48 48 0 1 0 0 96h272v272a48 48 0 1 0 96 0V560h272a48 48 0 1 0 0-96z"></path></svg><span class="add-icon"></span>
        </v-button>
    </section>
</template>

<style src="./index.scss"></style>

<script>
import VButton from "../../common/button"

export default {
    components: {
        VButton
    }
}
</script>

