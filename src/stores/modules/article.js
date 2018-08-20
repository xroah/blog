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

const article = {
    state: {
        list: [],
        loaded: true
    },
    mutations: {
        [UPDATE_ARTICLE_LIST](state, payload) {
            state.list = payload.list;
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
        async [DELETE_ARRTICLE]({
            dispatch
        }, id) {
            await fetch(ARTICLE, {
                method: "delete",
                body: {
                    id
                }
            });
            dispatch(FETCH_ARTICLE_LIST, true);
        },
        async [ADD_ARTICLE]({dispatch}, payload) {
            await fetch(ARTICLE, {
                method: payload.method,
                body: payload.body
            });
            dispatch(FETCH_ARTICLE_LIST, true);
        }
    }
};

export default article;