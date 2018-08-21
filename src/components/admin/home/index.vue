<template>
    <section>
        <article-list></article-list>
        <div class="add-new-wrapper" ref="addWrapper">
            <transition name="scale-fade">
                <div class="addition-type" v-if="showType">
                    <v-button type="primary" title="添加笔记" @click="addNote">
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30">
                            <path d="M512.761856 230.106112l-360.31488 0L152.446976 871.2448l589.847552 0L742.294528 544.626688l51.291136-48.973824L793.585664 871.2448c0 28.324864-22.966272 51.291136-51.291136 51.291136l-589.847552 0c-28.324864 0-51.291136-22.966272-51.291136-51.291136l0-641.138688c0-28.325888 22.966272-51.291136 51.291136-51.291136L563.289088 178.814976l1.276928 1.277952L512.761856 230.106112zM806.509568 152.706048c15.490048 0.776192 30.027776 7.675904 40.445952 19.171328 13.686784 10.894336 22.514688 26.747904 24.594432 44.115968-1.62816 18.169856-10.317824 34.987008-24.205312 46.83264-14.263296 14.738432-126.02368 125.159424-332.102656 328.269824l-15.777792 15.552512c-23.629824 7.300096-80.217088 25.483264-122.993664 39.281664 13.774848-45.48096 30.304256-100.427776 37.666816-126.399488 44.053504-44.003328 335.307776-334.820352 346.377216-345.726976 12.335104-12.284928 28.663808-19.74784 46.031872-21.050368M806.546432 101.465088c-30.954496 1.214464-60.319744 14.062592-82.221056 35.989504C712.329216 149.300224 372.349952 488.790016 372.349952 488.790016c-2.679808 2.705408-4.608 6.048768-5.597184 9.730048-9.203712 34.035712-55.360512 185.116672-55.824384 186.61888-2.354176 7.713792-0.25088 16.104448 5.459968 21.801984 4.007936 4.032512 9.46688 6.286336 15.152128 6.273024 2.229248 0.013312 4.458496-0.324608 6.587392-0.989184 1.577984-0.526336 157.492224-50.939904 183.149568-58.60352 3.381248-1.01376 6.462464-2.842624 8.979456-5.310464 16.191488-15.978496 328.671232-323.611648 353.902592-349.745152 26.145792-26.923008 39.156736-55.022592 38.656-83.34848-1.990656-31.118336-16.57856-60.094464-40.3968-80.2304-19.871744-20.774912-47.19616-32.80896-75.933696-33.434624l0 0L806.546432 101.465088z"></path>
                        </svg>
                    </v-button>
                    <v-button type="primary" title="添加文章" @click="addArticle">
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30">
                            <path d="M661.648 118H249.104c-39.088 0-70.304 31.752-70.304 70.304v647.392c0 39.096 31.752 70.304 70.304 70.304h525.8c38.552 0 70.296-31.752 70.296-70.304V301.56L661.648 118z m12.664 74.704l96.176 96.184H684.584c-5.408 0-10.272-4.864-10.272-10.272V192.704z m126.928 642.992a26.24 26.24 0 0 1-26.344 26.352H249.104a26.24 26.24 0 0 1-26.344-26.352V188.304a26.24 26.24 0 0 1 26.344-26.344v-0.464h381.328v117.192c0 29.824 24.416 54.16 54.16 54.16h116.656v502.848z"></path>
                            <path d="M348.68 386.072h188.968a21.84 21.84 0 0 0 21.944-21.936 21.84 21.84 0 0 0-21.944-21.944H348.68a21.832 21.832 0 0 0-21.944 21.944 21.84 21.84 0 0 0 21.944 21.936zM674.848 644.8H348.68c-12.208 0-21.944 9.744-21.944 21.944s9.736 21.944 21.944 21.944h326.168c12.208 0 21.944-9.744 21.944-21.944S687.064 644.8 674.848 644.8zM348.68 495.856a21.824 21.824 0 0 0-21.944 21.944 21.832 21.832 0 0 0 21.944 21.936h326.168a21.832 21.832 0 0 0 21.944-21.936 21.832 21.832 0 0 0-21.944-21.944H348.68z"></path>
                        </svg>
                    </v-button>
                </div>
            </transition>
            <v-button type="primary" class="add-new-article" @click="showBtns">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30">
                    <path d="M832 464H560V192a48 48 0 1 0-96 0v272H192a48 48 0 1 0 0 96h272v272a48 48 0 1 0 96 0V560h272a48 48 0 1 0 0-96z"></path>
                </svg>
                <span class="add-icon"></span>
            </v-button>
        </div>
    </section>
</template>

<style src="./index.scss"></style>

<script>
import VButton from "../../common/button";
import NavBar from "../nav";
import ArticleList from "../articleList";
export default {
    components: {
        VButton,
        NavBar,
        ArticleList
    },
    data() {
        return {
            showType: false,
            articles: [],
            loaded: false,
        };
    },
    created() {
        document.addEventListener("click", this.clickOutWrapper);
    },
    destroyed() {
        document.removeEventListener("click", this.clickOutWrapper);
    },
    methods: {
        //click outside of the wrapper(add article or note wrapper)
        //and close the wrapper
        clickOutWrapper(evt) {
            let wrapper = this.$refs.addWrapper;
            let target = evt.target;
            if (target !== wrapper && !wrapper.contains(target)) {
                this.showType = false;
            }
        },
        showBtns(evt) {
            this.showType = !this.showType;
            evt.stopPropagation();
        },
        addArticle() {
            this.showType = false;
            this.$router.push({
                name: "addArticle"
            });
        },
        addNote() {
            console.log("add note");
            this.showType = false;
        }
    }
};
</script>

