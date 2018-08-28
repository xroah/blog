<template>
    <div class="upload-wrapper" @click="pickImg">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" version="1.1" p-id="2137" width="32" height="32">
            <path d="M925.258115 541.556153h-826.831408c-16.954137 0-30.699186-13.745049-30.699186-30.699186s13.745049-30.699186 30.699186-30.699186h826.831408c16.954137 0 30.699186 13.745049 30.699186 30.699186s-13.745049 30.699186-30.699186 30.699186z" />
            <path d="M511.842411 954.971857c-16.954137 0-30.699186-13.745049-30.699186-30.699186v-826.831408c0-16.954137 13.745049-30.699186 30.699186-30.699186s30.699186 13.745049 30.699186 30.699186v826.831408c0 16.954137-13.745049 30.699186-30.699186 30.699186z" />
        </svg>
        <input type="file" @change="change" class="upload-input" accept="image/png,image/jpeg,image/gif" ref="input">
        <img class="uploaded-img" v-if="hasImg" :src="src">
    </div>
</template>

<style src="./index.scss"></style>

<script>
import message from "../../common/message";
import fetch from "../../common/fetch";
import { UPLOAD_IMG } from "../../common/api";

export default {
    data() {
        return {
            src: "",
            hasImg: false
        };
    },
    methods: {
        pickImg() {
            this.$refs.input.click();
        },
        change(evt) {
            const MAX_SIZE = 2 * 1024 * 1024; //2MB
            let files = evt.target.files;
            let img = files[0];
            let mime = {
                "image/jpeg": 1,
                "image/png": 1,
                "image/gif": 1
            };
            if (!img) {
                this.src = "";
                this.hasImg = false;
                return;
            }
            if (!(img.type in mime)) {
                message.error("文件格式错误!");
                return;
            } else if (img.size > MAX_SIZE) {
                message.error("文件不能超过2MB");
                return;
            } 
            this.showImg(img);
            this.upload(img);
        },
        showImg(img) {
            let fr = new FileReader();
            fr.readAsDataURL(img);
            fr.onload = () => {
                this.src = fr.result;
                this.hasImg = true;
                fr.onload = null;
            }
        },
        async upload(img) {
            let fd = new FormData();
            fd.append("attachment", img);
            try {
                await fetch(UPLOAD_IMG, {
                    method: "post",
                    body: fd
                });
            } catch (error) {
                
            }
        }
    }
};
</script>
