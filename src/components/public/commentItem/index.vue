<template>
    <div class="comment-item-wrapper">
        <div class="avatar">
            <img :src="avantar">
        </div>
        <div class="comment-details">
            <a :href="href" class="user-link">{{userName}}</a>
            <span>
                <span class="reply-text">回复</span>
                <a href="#" class="user-link">test</a>
            </span>说:
            <div class="comment-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, perferendis suscipit. Iure dolores earum aspernatur quisquam ex, sed dolor harum quia nobis obcaecati ipsum voluptate delectus, tempore culpa consequuntur nesciunt.
            </div>
            <div class="other">
                <div>
                    <a href="javascript:;" class="reply">查看对话</a>
                    <a href="javascript:;" class="reply" @click="toggleEditor">回复</a>
                </div>
                <span>2018-08-10 08:19:00</span>
            </div>
            <comment-editor :showCancel="true" @cancel="toggleEditor" v-if="showEditor" />
        </div>
    </div>
</template>

<style src="./index.scss"></style>

<script>
import avantar from "../../../assets/images/avatar.png";
import CommentEditor from "../../common/commentEditor";

export default {
    props: {
        avantar: {
            type: String,
            default: avantar
        },
        userName: String,
        time: String,
        content: String,
        href: String
    },
    data() {
        return {
            showEditor: false
        };
    },
    components: {
        CommentEditor
    },
    methods: {
        toggleEditor() {
            this.showEditor = !this.showEditor;
        }
    }
};
</script>

