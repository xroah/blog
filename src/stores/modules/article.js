import fetch from "../../components/common/fetch";
import {
    ARTICLE
} from "../../components/common/api";
import {
    FETCH_ARTICLE_LIST,
    UPDATE_ARTICLE_LIST,
    CHANGE_ARTICLE_LOAD_STATE,
    ADD_ARTICLE,
    DELETE_ARRTICLE
} from "../actions";

const PAGE_SIZE = 10; //number of per page

const article = {
    state: {
        list: [],
        loaded: true,
        total: 0,
        current: 1,
        keywords: ""
    },
    mutations: {
        [UPDATE_ARTICLE_LIST](state, payload) {
            if (payload.count !== undefined) {
                state.total = Math.ceil(payload.count / PAGE_SIZE);
            }
            state.list = payload.list; 
        },
        [CHANGE_ARTICLE_LOAD_STATE](state, payload) {
            state.loaded = payload.loaded;
        },
        updateCache(state, payload) {
            //cache previos page and keywords
            //if the page or keywords changed, refresh the list
            state.current = payload.page;
            state.keywords = payload.keywords;
        }
    },
    actions: {
        async [FETCH_ARTICLE_LIST]({
            state,
            commit
        }, payload = {}) {
            //if list has value and force param not passed, use original value
            let {page = 1, keywords = "", force}  = payload;
            if (page !== state.current || keywords !== state.keywords) {
                //changed page or keywords
                //set force to true, for refshing the list
                force = true;
                commit("updateCache", {
                    page, 
                    keywords
                });
            }
            if (!force && state.list.length) return;
            commit({
                type: CHANGE_ARTICLE_LOAD_STATE,
                loaded: false
            });
            //clear original list
            commit({
                type: UPDATE_ARTICLE_LIST,
                list: []
            });
            try {
                let ret = await fetch(`${ARTICLE}/${page}/${keywords}`);
                commit({
                    type: UPDATE_ARTICLE_LIST,
                    list: ret.list,
                    count: ret.count
                });
            } catch (error) {}
            commit({
                type: CHANGE_ARTICLE_LOAD_STATE,
                loaded: true
            });
        },
        async [DELETE_ARRTICLE]({
            dispatch
        }, id) {
            await fetch(ARTICLE, {
                method: "delete",
                body: {
                    id
                }
            });
            dispatch(FETCH_ARTICLE_LIST, {
                force: true
            });
        },
        async [ADD_ARTICLE]({
            dispatch
        }, payload) {
            await fetch(ARTICLE, {
                method: payload.method,
                body: payload.body
            });
            dispatch(FETCH_ARTICLE_LIST, {
                force: true
            });
        }
    },
    getters: {
        getArticleById: state => id => {
            //_id: from server
            return state.list.find(item => item._id === id);
        }
    }
};

export default article;