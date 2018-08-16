<template>
    <section class="add-edit-article">
        <div class="form-flex">
            <span class="form-label">文章标题:</span>
            <input type="text" class="v-input form-control">
        </div>
        <div class="form-flex">
            <span class="form-label">文章分类:</span>
            <select type="text" class="v-input form-control">
                <option 
                v-for="item in classification"
                :key="item._id"
                value="item._id">{{item.name}}</option>
            </select>
        </div>
        <div class="form-flex row-always">
            <span class="form-label">是否公开:</span>
            <div>
                <radio name="permission" value="0" v-model="secret">是</radio>
                <radio name="permission" value="1" v-model="secret">否</radio>
            </div>
        </div>
    </section>
</template>
<style src="./index.scss"></style>

<script>
import Radio from "../../common/radio";
import fetch from "../../common/fetch";
import { ARTICLE_CLASSIFY } from "../../common/api";

export default {
    data() {
        return {
            secret: "0",
            classification: []
        }
    },
    components: {
        Radio
    },
    async created() {
        try {
            let res = await fetch(ARTICLE_CLASSIFY);
            this.classification = res;
        }catch(err){}
    },
    methods: {
        
    }
}
</script>
