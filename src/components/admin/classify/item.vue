<template>
    <div class="classify-item-wrapper" @click="edit" :class="showInput ? 'editing' : ''" title="点击编辑">
        <input 
            type="text"
            class="v-input"
            maxlength="10"
            @blur="blur"
            ref="input"
            v-show="showInput"
            v-model="content">
        <span v-show="!showInput">
            <slot></slot>
            <span class="del-item" @click="del($event)">&times;</span>
        </span>
    </div>
</template>

<script>
export default {
    props: ["value", "id"],
    data() {
        return {
            content: this.value,
            prevValue: this.value,
            showInput: !this.value
        }
    },
    methods: {
        edit() {
            this.showInput = true;
            setTimeout(() => {this.$refs.input.focus()});
        },
        del(evt) {
            evt.stopPropagation();
        },
        blur() {
            this.showInput = false;
        }
    }
};
</script>
