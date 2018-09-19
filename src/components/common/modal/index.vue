<template>
    <div>
        <transition name="modal">
            <div class="modal" v-show="visible">
                <div class="modal-content" :style="{top: top + 'px'}">
                    <div class="modal-header">
                        <h3>{{title}}</h3>
                        <a href="javascript:;" class="close" @click="close">&#10005;</a>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade-in-half">
            <div class="modal-mask" v-show="visible"></div>
        </transition>
    </div>
</template>

<style src="./index.scss"></style>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        top: {
            type: Number,
            default: 100
        },
        title: String,
        onCancel: {
            type: Function,
            default: () => {}
        }
    },
    methods: {
        close() {
            this.$emit("update:visible", false);
            this.onCancel();
        }
    }
};
</script>


