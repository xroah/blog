<template>
    <div class="classify-item-wrapper" @click="edit" :class="showInput ? 'editing' : ''">
        <input type="text" class="v-input" maxlength="20" @blur="blur" @keydown="keyDown" ref="input" v-show="showInput" v-model="content">
        <span v-show="!showInput">
            <span title="点击编辑">{{content}}</span>
            <span class="del-item" v-if="!addMode" @click="del($event, cid, content)">&times;</span>
        </span>
    </div>
</template>

<script>
import message from "../../common/message";
import loading from "../../common/loading";
import {
    FETCH_CLASSIFICATION_LIST,
    UPDATE_CLASSIFICATION_ITEM,
    UPDATE_CLASSFICATION_ID
} from "../../../stores/actions";
import { mapMutations, mapActions } from "vuex";

export default {
    props: {
        value: String,
        id: String,
        onBlur: Function,
        delHandler: Function,
        add: Boolean
    },
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
            updateFromList: UPDATE_CLASSIFICATION_ITEM
        }),
        ...mapActions({
            updateNameFromServer: UPDATE_CLASSIFICATION_ITEM
        }),
        edit() {
            this.showInput = true;
            setTimeout(() => {
                //the refs will have value when mounted
                //or when the input has shown, the input can be focused
                this.$refs.input.focus();
            });
        },
        del(evt, id, content) {
            //prevent click del button from triggering edit
            evt.stopPropagation();
            //the parent component do real delete
            this.delHandler(id, content);
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
        async blur() {
            this.showInput = false;
            if (this.addMode) {
                if (!this.content) {
                    //when add, if no value was inputed, emit onBlur event
                    //the parent component delete the last
                    this.$emit("onBlur", true);
                } else {
                    loading.show();
                    try {
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
                        this.$emit("onBlur");
                    } catch (er) {
                        this.edit();
                    }
                }
                loading.hide();
                return;
            }
            if (this.prevValue !== this.content) {
                //if empty the input
                if (!this.content) {
                    this.content = this.prevValue;
                    return;
                }
                loading.show();
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
                    this.$emit("onBlur");
                    this.prevValue = this.content;
                } catch (er) {
                    //failed, focus and reedit
                    this.edit();
                }
                loading.hide();
            }
        }
    }
};
</script>
