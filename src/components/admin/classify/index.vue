<template>
    <section class="classify-container">
        <item value="javascript">javascript</item>
        <item value="css">css</item>
        <item value="nodejs">nodejs</item>
        <item value="php">php</item>
        <item value="c语言">c语言</item>
        <v-button>新增</v-button>
    </section>
</template>

<style src="./index.scss"></style>

<script>
import Item from "./item";
import VButton from "../../common/button";

export default {
    components: {
        Item,
        VButton
    }
}
</script>
