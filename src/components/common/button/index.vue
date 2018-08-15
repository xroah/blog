<template>
    <button 
    :type="htmlType" 
    :class="type ? `v-btn-${type}` : ''" 
    class="v-btn"
    @click="_click($event)">
    <slot></slot>
    </button>
</template>
<style lang="scss" src="./index.scss"></style>
<script>
export default {
  props: {
    type: String,
    htmlType: String,
    click: Function
  },
  methods: {
      _click(evt) {
          if (typeof this.click === "function") {
              this.click(evt);
          }
      }
  }
};
</script>


