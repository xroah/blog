<template>
    <div class="pagination">
        <ul class="page-items" v-if="total">
            <li :class="{disabled: currentPage === 1}">
                <a href="#" class="page-link" @click.prevent="prev()">上一页</a>
            </li>
            <li :class="{active: 1 === currentPage}">
                <a href="#" class="page-link" @click.prevent="to(1)">1</a>
            </li>
            <li class="disabled" v-if="currentPage > 4 && total > visiblePages">
                <a href="#" class="page-link">&bull;&bull;&bull;</a>
            </li>
            <li v-for="page in pages" :key="page" :class="{active: page === currentPage}">
                <a href="#" class="page-link" @click.prevent="to(page)">{{page}}</a>
            </li>
            <li class="disabled" v-if="currentPage < total - 3 && total > visiblePages">
                <a href="#" class="page-link">&bull;&bull;&bull;</a>
            </li>
            <li :class="{active: total === currentPage}">
                <a href="#" class="page-link" v-if="total > 1" @click.prevent="to(total)">{{total}}</a>
            </li>
            <li :class="{disabled: currentPage === total}">
                <a href="#" class="page-link" @click.prevent="next()">下一页</a>
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
    data() {
        return {
            visiblePages: 7,
            currentPage: this.current || 1,
            pages: []
        };
    },
    watch: {
        current(newVal) {
            //the 'current' prop changed was not by pageChange or sync event
            if (newVal !== this.currentPage) {
                this.reset();
                this.renderPages();
            }
        },
        total() {
            //total changed
            this.reset();
            this.renderPages();
        }
    },
    methods: {
        emitChangeEvent(page) {
            this.$emit("pageChange", page);
            //for .sync
            this.$emit("update:current", page);
            this.renderPages();
        },
        reset() {
            let { current, total } = this;
            if (current && total) {
                this.currentPage = current > total ? total : current;
            }
        },
        renderPages() {
            let { visiblePages, currentPage, total, pages } = this;
            if (visiblePages > total) {
                let pages = [];
                let start = 2;
                for (let i = 0, l = total - 2; i < l; i++) {
                    pages.push(start++);
                }
                this.pages = pages;
                return;
            }
            function loop5Times(start) {
                let pages = [];
                for (let i = 0; i < 5; i++) {
                    pages.push(start++);
                }
                return pages;
            }
            if (currentPage <= 4) {
                this.pages = loop5Times(2);
            } else if (currentPage >= total - 3) {
                this.pages = loop5Times(total - 5);
            } else {
                this.pages = loop5Times(currentPage - 2);
            }
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
                this.emitChangeEvent((this.currentPage = page));
            }
        }
    }
};
</script>

