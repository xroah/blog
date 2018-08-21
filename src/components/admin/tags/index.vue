<template>
    <div class="article-tags">
        <tag :closable="true" @closed="removeTag" v-for="t in tags" :text="t" :key="t">{{t}}</tag>
        <input type="text" maxlength="10" class="v-input" ref="input" @blur="blur" @keydown.enter="blur" v-if="showInput">
        <tag class="add-tag" @click="addTag" text="+新增标签" v-else></tag>
    </div>
</template>

<style lang="scss">
.article-tags {
    .v-input {
        width: 100px;
        height: 22px;
    }
    .v-tag + .v-tag {
        margin-left: 5px;
    }
}
</style>


<script>
import Tag from "../../common/tag";
export default {
    props: {
        tags: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            showInput: false
        };
    },
    components: {
        Tag
    },
    methods: {
        blur(evt) {
            let { tags } = this;
            let value = evt.target.value.trim();
            //if the value not empty and exists, tell the parent component to add this item
            if (value && tags.indexOf(value) === -1) {
                this.$emit("addTag", value);
            }
            this.showInput = false;
        },
        addTag() {
            this.showInput = true;
            //delay, the input can be focused when it has shown
            setTimeout(() => {
                this.$refs.input.focus();
            });
        },
        removeTag(text) {
            let { tags } = this;
            let index = tags.findIndex(t => t === text);
            //tell the parent component to remove this item by index
            this.$emit("removeTag", index);
        }
    }
};
</script>

