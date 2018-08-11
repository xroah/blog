<template>
     <div class="message-item" :class="type ? type: ''"> 
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24"><path id="p1"></path><path id="p2"></path></svg>
        <span>{{text}}</span>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script>
export default {
    props: ["type", "text"]
};
</script>


