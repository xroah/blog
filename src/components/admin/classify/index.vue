<template>
    <section class="classify-container">
        <item 
        v-for="item in list"
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
import loading from "../../common/loading";
import { FETCH_CLASSIFICATION_LIST, ADD_CLASSIFICATION } from "../../../stores/actions";
import { mapState, mapActions, mapMutations } from "vuex";

let guid = 0;

export default {
    data() {
        return {
            showAdd: true
        };
    },
    computed: {
        ...mapState({
            list: state => state.classification.list
        })
    },
    components: {
        Item,
        VButton
    },
    async created() {
        loading.show();
        await this.fetchCls();
        loading.hide();
    },
    methods: {
        ...mapActions({
            fetchCls: FETCH_CLASSIFICATION_LIST
        }),
        ...mapMutations({
            add: ADD_CLASSIFICATION
        }),
        addItem() {
            this.add();
            this.showAdd = false;
        },
        onBlur(destroyLast) {
           this.showAdd = true;
        }
    }
};
</script>
