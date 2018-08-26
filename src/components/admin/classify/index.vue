<template>
    <section class="classify-container">
        <!-- <item 
        v-for="item in list"
        :value="item.name"
        :add="!!item.add"
        :id="item._id"
        @onBlur="onBlur"
        :delHandler="delItem"
        :key="item._id"></item>
        <v-button @click="addItem" v-if="showAdd">新增</v-button> -->
        <ul class="cls-list">
            <li>
                <div>
                    <span>名称</span>
                    <span>分类级别</span>
                    <span>创建时间</span>
                    <span>操作</span>
                </div>
            </li>
            <li class="expanded">
                <div>
                    <span>
                        <a class="expand" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" version="1.1" width="16" height="16">
                                <path d="M689.621 512l-328.832-328.832-60.331 60.331 268.501 268.501-268.501 268.501 60.331 60.331z" fill="#666" />
                            </svg>&nbsp;
                        </a>
                        生活随笔
                    </span>
                    <span>一级分类</span>
                    <span>2018-08-26 08:26</span>
                    <span>
                        <a href="#">编辑</a>
                        <a href="#">删除</a>
                    </span>
                </div>
                <ul>
                    <li>
                        <div>
                            <span>摄影</span>
                            <span>二级分类</span>
                            <span>2018-08-26 09:22</span>
                            <span>
                                <a href="#">编辑</a>
                                <a href="#">删除</a>
                            </span>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
</template>

<style src="./index.scss"></style>

<script>
import Item from "./item";
import VButton from "../../common/button";
import loading from "../../common/loading";
import msgBox from "../../common/messageBox";
import message from "../../common/message";
import {
    FETCH_CLASSIFICATION_LIST,
    ADD_CLASSIFICATION,
    DELETE_CLASSIFICATION_BY_ID
} from "../../../stores/actions";
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
            delFromServer: DELETE_CLASSIFICATION_BY_ID
        }),
        ...mapMutations({
            add: ADD_CLASSIFICATION,
            delFromList: DELETE_CLASSIFICATION_BY_ID
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
                    this.delFromList({ id });
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
