<template>
    <div class="classify-item-wrapper" @click="edit" :class="showInput ? 'editing' : ''">
        <input 
            type="text"
            class="v-input"
            maxlength="20"
            @blur="blur"
            @keydown="keyDown"
            ref="input"
            v-show="showInput"
            v-model="content">
        <span v-show="!showInput">
            <span title="点击编辑">{{content}}</span>
            <span class="del-item" v-if="!addMode" @click="del($event)">&times;</span>
        </span>
    </div>
</template>

<script>
import fetch from "../../common/fetch";
import { ARTICLE_CLASSIFY } from "../../common/api";
import message from "../../common/message";
import msgBox from "../../common/messageBox";
import {
    FETCH_CLASSIFICATION_LIST,
    DELETE_CLASSIFICATION_BY_ID,
    UPDATE_CLASSIFICATION_ITEM,
    UPDATE_CLASSIFICATION_NAME_BY_ID,
    UPDATE_CLASSFICATION_ID
} from "../../../stores/actions";
import { mapMutations, mapActions } from "vuex";

export default {
    props: ["value", "id", "onBlur", "add"],
    data() {
        return {
            content: this.value,
            prevValue: this.value, //previos value, when edit failed, rollback
            showInput: false,
            addMode: this.add, //add or edit
            cid: this.id
        };
    },
    mounted() {
        if (this.addMode) {
            this.edit();
        }
    },
    methods: {
        ...mapMutations({
            delFromList: DELETE_CLASSIFICATION_BY_ID,
            updateFromList: UPDATE_CLASSIFICATION_ITEM
        }),
        ...mapActions({
            delFromServer: DELETE_CLASSIFICATION_BY_ID,
            updateNameFromServer: UPDATE_CLASSIFICATION_NAME_BY_ID
        }),
        edit() {
            this.showInput = true;
            setTimeout(() => {
                //the refs will have value when mounted
                //or when the input has shown, the input can be focused
                this.$refs.input.focus();
            });
        },
        keyDown(evt) {
            let key = evt.key.toLowerCase();
            let { input } = this.$refs;
            //handle enter key or esc key
            if (key === "enter") {
                if (this.content) {
                    input.blur();
                }
            } else if (key === "escape") {
                this.content = this.prevValue;
                input.blur();
            }
        },
        async del(evt) {
            evt.stopPropagation();
            msgBox.confirm(`确定要将 ${this.content} 删除吗?`, async () => {
                try {
                    await this.delFromServer(this.cid);
                    this.delFromList({id: this.cid});
                    message.success("删除成功");
                    //emit origianl id prop just for remove the item
                    //if added successfully, the cid will change
                    this.$emit("onBlur", true, this.id);
                } catch (err) {}
            });
        },
        async blur() {
            this.showInput = false;
            if (this.addMode) {
                if (!this.content) {
                    //when add, if no value was inputed, just destroy the item
                    this.delFromList({});
                    this.$emit("onBlur");
                } else {
                    // try {
                    let res = await this.updateNameFromServer({
                        method: "post",
                        body: {
                            name: this.content
                        }
                    });
                    message.success("保存成功!");
                    //update the item
                    //otherwise when edit the item will add new one
                    this.updateFromList({
                        prevId: this.cid,
                        name: this.content,
                        _id: res.id
                    });
                    this.$emit("onBlur"); //emit blur, the parent component show the add button
                    //} catch (er) {
                    //this.edit();
                    // }
                }
                return;
            }
            if (this.prevValue !== this.content) {
                //if empty the input
                if (!this.content) {
                    this.content = this.prevValue;
                    return;
                }
                try {
                    await this.updateNameFromServer({
                        method: "put",
                        body: {
                            id: this.cid,
                            name: this.content
                        }
                    });
                    this.updateFromList({
                        _id: this.cid,
                        name: this.content
                    });
                    message.success("保存成功!");
                } catch (er) {
                    //failed, reset the content
                    this.content = this.prevValue;
                }
            }
        }
    }
};
</script>
