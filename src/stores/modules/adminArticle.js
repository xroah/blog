import fetch from "../../components/common/fetch";
import { ADMIN_ARTICLE } from "../../components/common/api";
import {
    ADD_ARTICLE,
    DELETE_ARRTICLE,
    FETCH_ADMIN_ARTICLE,
    fetchAricle
} from "../actions";

import { updateArticle } from "../mutations";
import { articleState } from "../state";
const article = {
    state: {
        ...articleState
    },
    mutations: {
        ...updateArticle
    },
    actions: {
        ...fetchAricle(FETCH_ADMIN_ARTICLE, ADMIN_ARTICLE),
        async [DELETE_ARRTICLE]({
            dispatch
        }, id) {
            await fetch(ADMIN_ARTICLE, {
                method: "delete",
                body: {
                    id
                }
            });
            dispatch(FETCH_ARTICLE_LIST, {
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