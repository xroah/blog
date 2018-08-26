<template>
    <section class="classify-container">
        <item 
        v-for="item in list"
        :value="item.name"
        :add="!!item.add"
        :id="item._id"
        @onBlur="onBlur"
        :delHandler="delItem"
        :key="item._id"></item>
        <v-button @click="addItem" v-if="showAdd">新增</v-button>
    </section>
</template>

<style src="./index.scss"></style>

<script>
import Item from "./item";
import VButton from "../../common/button";
import loading from "../../common/loading";
import msgBox from "../../common/messageBox";
import message from "../../common/message";
import { FETCH_CLASSIFICATION_LIST, ADD_CLASSIFICATION, DELETE_CLASSIFICATION_BY_ID } from "../../../stores/actions";
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
            fetchCls: FETCH_CLASSIFICATION_LIST,
            delFromServer: DELETE_CLASSIFICATION_BY_ID,
        }),
        ...mapMutations({
            add: ADD_CLASSIFICATION,
            delFromList: DELETE_CLASSIFICATION_BY_ID,
        }),
        addItem() {
            this.add();
            this.showAdd = false;
        },
        async delItem(id, content) {
            msgBox.confirm(`确定要将 ${this.content} 删除吗?`, async () => {
                loading.show();
                try {
                    await this.delFromServer(id);
                    this.delFromList({id});
                    message.success("删除成功");
                } catch (err) {}
                loading.hide();
            });
        },
        onBlur(removeLast) {
           this.showAdd = true;
           if (removeLast) {
               this.delFromList();
           }
        }
    }
};
</script>
