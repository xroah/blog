<template>
    <button 
    :type="htmlType" 
    :class="type ? `v-btn-${type}` : ''" 
    class="v-btn"
    @click="_click">
        {{text}}
        <slot></slot>
    </button>
</template>
<style lang="scss" src="./index.scss"></style>
<script>
export default {
  props: {
    text: String,
    type: String,
    htmlType: String,
    click: Function
  },
  methods: {
      _click() {
          if (typeof this.click === "function") {
              this.click();
          }
      }
  }
};
</script>


