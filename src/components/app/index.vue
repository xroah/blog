<template>
    <div class="input-box">
        <img :src="logo">
        <div>已输入: {{test}}</div>
        <input type="text" v-model="test">
    </div>
</template>

<style lang="scss">
    .input-box {
        padding: 10px;
        background: #f7f7f7;

        input {
            outline: none;
            height: 30px;
            width: 300px;
            padding: 0 5px;
            margin-top: 10px;
            border: 1px solid #40a9ff;
            border-radius: 5px;
            font-size: 14px;
            transition: all .3s;

            &:focus {
                box-shadow: 0 0 0 2px rgba(24,144,255,.2);
            }
        }
    }
</style>

<script>
import logo from "../assets/images/logo.png";
export default {
    data() {
        return {
            test: "",
            logo
        }
    }
}
</script>


