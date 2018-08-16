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
            <span class="del-item" @click="del($event)">&times;</span>
        </span>
    </div>
</template>

<script>
import fetch from "../../common/fetch";
import { ARTICLE_CLASSIFY } from "../../common/api";
import message from "../../common/message";
import msgBox from "../../common/messageBox";

export default {
    props: ["value", "id", "onBlur", "add"],
    data() {
        return {
            content: this.value,
            prevValue: this.value, //previos value, when edit fail, rollback
            showInput: this.add
        };
    },
    mounted() {
        if (this.add) {
            this.$refs.input.focus();
        }
    },
    methods: {
        edit() {
            this.showInput = true;
            setTimeout(() => {
                this.$refs.input.focus();
            });
        },
        keyDown(evt) {
            let key = evt.key.toLowerCase();
            let { input } = this.$refs;
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
                    await fetch(ARTICLE_CLASSIFY, {
                        method: "delete",
                        body: {
                            id: this.id
                        }
                    });
                    message.success("删除成功");
                    this.$emit("onBlur", true, this.id);
                }catch(err){}
            });
        },
        async blur() {
            this.showInput = false;
            if (this.add) {
                if (!this.content) {
                    this.$emit("onBlur", true);
                } else {
                    try {
                        await fetch(ARTICLE_CLASSIFY, {
                            method: "post",
                            body: {
                                name: this.content
                            }
                        });
                        message.success("保存成功!");
                        this.$emit("onBlur"); //emit blur, the parent component show the add button
                    } catch (er) {
                        this.edit();
                    }
                }
                return;
            }
            if (this.prevValue !== this.content) {
                if (!this.content) {
                    this.content = this.prevValue;
                    return;
                }
                try {
                    await fetch(ARTICLE_CLASSIFY, {
                        method: "put",
                        body: {
                            id: this.id,
                            name: this.content
                        }
                    });
                    message.success("保存成功!");
                    this.$emit("onBlur");
                    this.prevValue = this.content;
                } catch (er) {
                    this.content = this.prevValue;
                }
            }
        }
    }
};
</script>
