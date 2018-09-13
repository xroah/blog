import fetch from "../../components/common/fetch";
import { ADMIN_ARTICLE, PUBLIC_ARTICLE } from "../../components/common/api";
import {
    ADD_ARTICLE,
    DELETE_ARRTICLE,
    FETCH_ADMIN_ARTICLE,
    FETCH_PUBLIC_ARTICLE,
    fetchAricle
} from "../actions";
import { UPDATE_ARTICLE_LIST, CHANGE_ARTICLE_LOAD_STATE } from "../mutations";
const PAGE_SIZE = 10; //number of per page

const article = {
    state: {
        list: [],
        loaded: true,
        total: 0,
        current: 1,
        keywords: undefined,
        error: false
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
            state.current = +payload.page || 1; //cast sto number
            state.keywords = payload.keywords;
        },
        changeState(state, payload) {
            state.error = payload.error;
        }
    },
    actions: {
        ...fetchAricle(FETCH_ADMIN_ARTICLE, ADMIN_ARTICLE), //for admin
        ...fetchAricle(FETCH_PUBLIC_ARTICLE, PUBLIC_ARTICLE), //for users
        async [DELETE_ARRTICLE]({
            dispatch
        }, id) {
            await fetch(ADMIN_ARTICLE, {
                method: "delete",
                body: {
                    id
                }
            });
            dispatch(FETCH_ADMIN_ARTICLE, {
                force: true
            });
        },
        //add or edit
        async [ADD_ARTICLE]({
            dispatch
        }, payload) {
            await fetch(ADMIN_ARTICLE, {
                method: payload.method,
                body: payload.body
            });
            dispatch(FETCH_ADMIN_ARTICLE, {
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