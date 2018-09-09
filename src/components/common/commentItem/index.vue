<template>
    <div class="comment-item-wrapper">
        <div class="avatar">
            <img :src="avantar">
        </div>
        <div class="comment-details">
            <a :href="href">{{userName}}</a>说:
            <div class="original-comment">
                <strong>回复aaaa:</strong>
                <div class="comment-content">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam dolorem accusamus neque in mollitia, laudantium autem quis alias debitis corrupti odio itaque impedit suscipit porro cum veritatis eligendi blanditiis nobis.
                </div>
            </div>
            <div class="comment-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, perferendis suscipit. Iure dolores earum aspernatur quisquam ex, sed dolor harum quia nobis obcaecati ipsum voluptate delectus, tempore culpa consequuntur nesciunt.
            </div>
            <div class="other">
                <span>2018-08-10 08:19:00</span>
                <a href="javascript:;" class="replay" @click="toggleEditor">回复</a>
            </div>
            <comment-editor :showCancel="true" @cancel="toggleEditor" v-show="showEditor"/>
        </div>
    </div>
</template>

<style src="./index.scss"></style>

<script>
import avantar from "../../../assets/images/avatar.png";
import CommentEditor from "../commentEditor/";

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

