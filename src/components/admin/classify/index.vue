<template>
    <section class="classify-container">
        <item 
        v-for="item in items"
        :value="item.name"
        :add="!!item.add"
        :id="item._id"
        @onBlur="onBlur"
        :key="item._id"></item>
        <v-button :click="addItem" v-if="showAdd">新增</v-button>
    </section>
</template>

<style src="./index.scss"></style>

<script>
import Item from "./item";
import VButton from "../../common/button";
import fetch from "../../common/fetch";
import { ARTICLE_CLASSIFY } from "../../common/api";
import loading from "../../common/loading";

let guid = 0;

export default {
    data(){
        return {
            items: [],
            showAdd: true
        }
    },
    components: {
        Item,
        VButton
    },
    async created() {
        loading.show();
        try {
            let ret = await fetch(ARTICLE_CLASSIFY);
            this.items = ret;
        }catch(err) {}
        loading.hide();
    },
    methods: {
        addItem() {
            this.items.push({
                _id: guid++,
                value: "",
                add: true
            });
            this.showAdd = false;
        },
        onBlur(destroyLast, id) {
            let { items } = this;
            if (destroyLast) {
                if (id) {
                    let index = items.findIndex(item => item.id === id);
                    items.splice(index, 1);
                } else {
                    items.pop();
                }
            }
            this.showAdd = true;
        }
    }
}
</script>
