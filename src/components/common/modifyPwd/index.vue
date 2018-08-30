<template>
    <div class="modify-pwd-wrapper">
        <div class="form-flex">
            <span class="form-label">原密码</span>
            <input type="password" class="v-input form-control" v-model="oldPwd">
        </div>
        <div class="form-flex">
            <span class="form-label">新密码</span>
            <input type="password" class="v-input form-control" v-model="newPwd">
        </div>
        <div class="form-flex">
            <span class="form-label">重复密码</span>
            <input type="password" class="v-input form-control" v-model="confirm">
        </div>
        <div class="form-flex">
            <span class="form-label"></span>
            <div class="form-control">
                <v-button type="primary" @click="ok">确定</v-button>
                <v-button style="margin-left: 10px;" @click="cancel">取消</v-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@media screen and (min-width: 641px) {
    .modify-pwd-wrapper {
        width: 300px;
        margin: 0 auto;
        .form-label {
            width: 60px;
            text-align: right;
        }
        .v-input {
            width: 240px;
            flex-grow: 0;
        }
    }
}
</style>

<script>
import VButton from "../../common/button";
import fetch from "../../common/fetch";
import message from "../../common/message/index";
import { MODIFY_PASSWORD } from "../../common/api";
import md5 from "blueimp-md5";

export default {
    components: {
        VButton
    },
    data() {
        return {
            oldPwd: "",
            newPwd: "",
            confirm: ""
        };
    },
    methods: {
        async ok() {
            let { oldPwd, newPwd, confirm } = this;
            if (!oldPwd || !newPwd || !confirm) return;
            if (newPwd !== confirm) {
                message.error("新密码和重复密码不一致!");
                return;
            }
            try {
                await fetch(MODIFY_PASSWORD, {
                    method: "post",
                    body: {
                        newPwd: md5(newPwd),
                        oldPwd: md5(oldPwd)
                    }
                });
                message.success("修改成功!");
            } catch(err){}
        },
        cancel() {
            this.$router.go(-1);
        }
    }
};
</script>


