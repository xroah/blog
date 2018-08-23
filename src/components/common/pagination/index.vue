<template>
    <div class="pagination">
        <ul class="page-items">
            <li :class="{disabled: currentPage === 1 || total === 0}">
                <a href="#" class="page-link" @click="prev()">上一页</a>
            </li>
            <li :class="{active: 1 === currentPage}">
                <a href="#" class="page-link" @click="to(1)">1</a>
            </li>
            <li class="disabled" v-if="currentPage > 3 && total > visiblePages">
                <a href="#" class="page-link">&bull;&bull;&bull;</a>
            </li>
            <li v-for="page in pages" :key="page" :class="{active: page === currentPage}">
                <a href="#" class="page-link" @click="to(page)">{{page}}</a>
            </li>
            <li class="disabled" v-if="currentPage < total - 3 && total > visiblePages">
                <a href="#" class="page-link">&bull;&bull;&bull;</a>
            </li>
            <li :class="{active: total === currentPage}">
                <a href="#" class="page-link" v-if="total > 1" @click="to(total)">{{total}}</a>
            </li>
            <li :class="{disabled: currentPage === total || total === 0}">
                <a href="#" class="page-link" @click="next()">下一页</a>
            </li>
        </ul>
    </div>
</template>

<style src="./index.scss"></style>

<script>
export default {
    props: {
        total: {
            required: true,
            type: Number
        },
        current: {
            type: Number,
            default: 1
        }
    },
    mounted() {
        let { total, visiblePages } = this;
        if (total <= visiblePages) {
            let pages = [];
            let start = 2;
            Array.apply(null, { length: total - 2 }).forEach(() => {
                pages.push(start++);
            });
            this.pages = pages;
        }
    },
    data() {
        return {
            visiblePages: 7,
            currentPage: this.current,
            pages: []
        };
    },
    methods: {
        emitChangeEvent(page) {
            this.$emit("pageChange", page);
        },
        prev() {
            if (this.currentPage > 1) {
                this.emitChangeEvent(--this.currentPage);
            }
        },
        next() {
            if (this.currentPage < this.total) {
                this.emitChangeEvent(++this.currentPage);
            }
        },
        to(page) {
            if (page !== this.currentPage) {
                this.emitChangeEvent(this.currentPage = page);
            }
        }
    }
};
</script>

