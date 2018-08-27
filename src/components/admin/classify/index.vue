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
            <li v-if="!list.length" class="text-center">无数据</li>
            <li :class="{expanded: cls.expanded}" v-for="cls in list" :key="cls._id">
                <div>
                    <span>
                        <a class="expand" href="#" @click.prevent="toggleExpand(cls)">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" version="1.1" width="16" height="16">
                                <path d="M689.621 512l-328.832-328.832-60.331 60.331 268.501 268.501-268.501 268.501 60.331 60.331z" fill="#666" />
                            </svg>&nbsp;
                        </a>
                        <span>{{cls.name}}</span>
                    </span>
                    <span>一级分类</span>
                    <span>{{cls.createTime}}</span>
                    <span>
                        <a href="#" class="add" @click.prevent="addItem(cls._id)">新增</a>
                        <a href="#" class="edit">编辑</a>
                        <a href="#" class="del" @click.prevent="del(id, cls.name)">删除</a>
                    </span>
                </div>
                <transition name="scale-in">
                    <ul class="sub-cls" v-show="cls.expanded">
                        <li v-for="sub in subList[cls._id]" :key="sub._id">
                            <div>
                                <span>{{sub.name}}</span>
                                <span>二级分类</span>
                                <span>{{sub.createTime}}</span>
                                <span>
                                    <a href="#" class="del">删除</a>
                                </span>
                            </div>
                        </li>
                        <!-- when added new first level, subList has no corresponding value -->
                        <li v-if="!subList || !subList[cls._id].length" class="text-center">无数据</li>
                    </ul>
                </transition>
            </li>
        </ul>
        <div class="add-btn text-center">
            <v-button @click="addItem">+新增</v-button>
        </div>
    </section>
</template>

<style src="./index.scss" scoped></style>

<script>
import VButton from "../../common/button";
import loading from "../../common/loading";
import msgBox from "../../common/messageBox";
import message from "../../common/message";
import {
    FETCH_CLASSIFICATION_LIST,
    ADD_CLASSIFICATION,
    DELETE_CLASSIFICATION_BY_ID,
    UPDATE_CLASSIFICATION_ITEM
} from "../../../stores/actions";
import { mapState, mapActions, mapMutations } from "vuex";

let guid = 0;

export default {
    computed: {
        ...mapState({
            list: state => state.classification.list,
            subList: state => state.classification.subList
        })
    },
    components: {
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
            updateFromServer: UPDATE_CLASSIFICATION_ITEM
        }),
        ...mapMutations({
            add: ADD_CLASSIFICATION,
            delFromList: DELETE_CLASSIFICATION_BY_ID,
            updateFromList: UPDATE_CLASSIFICATION_ITEM
        }),
        addItem(pid) {
            msgBox.prompt({
                onOk: value => {
                    if (!value.trim()) return;
                    loading.show();
                    try {
                        await this.updateFromServer({
                            method: "post",
                            body: {
                                name: value,
                                pid
                            }
                        });
                        message.success("保存成功!");
                    } catch (error) {}
                    loading.hide();
                },
                title: "请输入"
            });
        },
        async delItem(pid, item) {
            msgBox.confirm(`确定要将 ${item.name} 删除吗?`, async () => {
                loading.show();
                try {
                    await this.delFromServer({
                        _id: item._id
                    });
                    this.delFromList({
                        pid,
                        _id: item._id
                    });
                    message.success("删除成功");
                } catch (err) {}
                loading.hide();
            });
        },
        onBlur(evt, obj) {
            let { add, name } = obj;
            let value = evt.target.value.trim();
            //add a item
            if (add) {
                if (!value) {
                    this.delFromList();
                } else {
                    this.updateItem({
                        method: "post",
                        body: {
                            name: model
                        }
                    });
                }
            }
        },
        toggleExpand(obj) {
            obj.expanded = !obj.expanded;
        }
    }
};
</script>
