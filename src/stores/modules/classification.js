import fetch from "../../components/common/fetch";
import {
    ARTICLE_CLASSIFY
} from "../../components/common/api";
import {
    FETCH_CLASSIFICATION_LIST,
    UPDATE_CLASSIFICATION_ITEM,
    UPDATE_CLASSIFICATION_NAME_BY_ID,
    DELETE_CLASSIFICATION_BY_ID,
    UPDATE_CLASSIFICATION_LIST,
    ADD_CLASSIFICATION
} from "../actions";

let guid = 0;

const classification = {
    state: {
        list: []
    },
    mutations: {
        [UPDATE_CLASSIFICATION_LIST](state, payload) {
            state.list = payload.list;
        },
        [UPDATE_CLASSIFICATION_ITEM](state, payload) {
            let {
                list
            } = state;
            let index = -1;
            for (let i = list.length; i--;) {
                let value = list[i];
                if (
                    value._id === payload.prevId || //for add mode, relace the prev id to new id
                    value._id === payload._id) {
                    index = i;
                    break;
                }
            }
            list.splice(index, 1, {
                name: payload.name,
                _id: payload._id,
            });
        },
        [DELETE_CLASSIFICATION_BY_ID](state, payload) {
            let {
                list
            } = state;
            let index = -1;
            //when addition operation cancelled, pop the last item
            if (!payload._id) {
                list.pop();
                return;
            }
            for (let i = list.lengt; i--;) {
                if (value._id === payload._id) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                list.splice(index, 1);
            }
        },
        [ADD_CLASSIFICATION](state) {
            state.list.push({
                _id: guid++,
                name: "",
                add: true
            });
        }
    },
    actions: {
        async [FETCH_CLASSIFICATION_LIST]({
            commit,
            state
        }) {
            if (state.list.length) return;
            try {
                let ret = await fetch(ARTICLE_CLASSIFY);
                commit({
                    type: UPDATE_CLASSIFICATION_LIST,
                    list: ret
                });
            } catch (err) {}
        },
        async [DELETE_CLASSIFICATION_BY_ID](context, id) {
            await fetch(ARTICLE_CLASSIFY, {
                method: "delete",
                body: {
                    id
                }
            });
        },
        [UPDATE_CLASSIFICATION_NAME_BY_ID](context, payload) {
            return fetch(ARTICLE_CLASSIFY, {
                method: payload.method,
                body: payload.body
            });
        },
    }
}

export default classification;