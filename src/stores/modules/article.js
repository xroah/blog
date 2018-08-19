import fetch from "../../components/common/fetch";
import {
    ARTICLE
} from "../../components/common/api";
import {
    FETCH_ARTICLE_LIST,
    UPDATE_ARTICLE_LIST,
    GET_ARTICLE_BY_ID,
    CHANGE_ARTICLE_LOAD_STATE
} from "../actions";

const article = {
    state: {
        list: [],
        loaded: true,
        current: null,
    },
    mutations: {
        [UPDATE_ARTICLE_LIST](state, payload) {
            state.list = payload.list;
        },
        [GET_ARTICLE_BY_ID](state, payload) {
            let ret;
            for (let value of state.list) {
                if (value._id === payload.id) {
                    ret = value;
                    break;
                }
            }
            state.current = ret;
        },
        [CHANGE_ARTICLE_LOAD_STATE](state, payload) {
            state.loaded = payload.loaded;
        }
    },
    actions: {
        async [FETCH_ARTICLE_LIST]({
            state,
            commit
        }, force) {
            //if list has value and force param not passed, use original value
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
                let ret = await fetch(ARTICLE);
                commit({
                    type: UPDATE_ARTICLE_LIST,
                    list: ret
                });
            } catch (error) {}
            commit({
                type: CHANGE_ARTICLE_LOAD_STATE,
                loaded: true
            });
        },
    }
};

export default article;