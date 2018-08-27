import fetch from "../../components/common/fetch";
import {
    ARTICLE_CLASSIFY
} from "../../components/common/api";
import {
    FETCH_CLASSIFICATION_LIST,
    UPDATE_CLASSIFICATION_ITEM,
    DELETE_CLASSIFICATION_BY_ID,
    UPDATE_CLASSIFICATION_LIST,
    ADD_CLASSIFICATION
} from "../actions";

const classification = {
    state: {
        list: [],
        subList: {}
    },
    mutations: {
        [UPDATE_CLASSIFICATION_LIST](state, payload) {
            let ret = payload.list;
            let list = [];
            let subList = {};
            for (let val of ret) {
                let pid = val.parentId;
                let tmp = subList[pid];
                if (pid) {
                    //set sub list
                    if (!tmp) {
                        tmp = subList[pid] = [];
                    }
                    tmp.push(val);
                } else {
                    list.push(val);
                }
            }
            state.list = list;
            state.subList = subList;
        },
        //when sever responsed successfully, update the item by _id
        [UPDATE_CLASSIFICATION_ITEM](state, payload) {
            let {
                list,
                subList
            } = state;
            //first level or second level
            if (payload.pid) {
                list = subList[payload.pid];
            }
            let index = -1;
            for (let i = list.length; i--;) {
                let value = list[i];
                if (value._id === payload._id) {
                    index = i;
                    break;
                }
            }
            let item = list[index];
            //update name of the item
            item.name = payload.name;
        },
        //when delete a item and the server responsed successfully,
        //delete the item from the list
        [DELETE_CLASSIFICATION_BY_ID](state, payload) {
            let {
                list,
                subList
            } = state;
            if (payload.pid) {
                list = subList[payload.pid];
            }
            let index = -1;
            for (let i = list.length; i--;) {
                if (value._id === payload._id) {
                    index = i;
                    break;
                }
            }
            list.splice(index, 1);
        },
        [ADD_CLASSIFICATION](state, payload) {
            let {
                newItem,
                pid
            } = payload;
            if (pid) {
                //add new item to second level
                if (!state.subList[pid]) {
                    state.subList[pid] = [];
                }
                state.subList[pid].push(newItem);
            } else {
                state.list.push(payload.newItem);
            }
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
                    ret
                });
            } catch (err) {}
        },
        //delete from server
        async [DELETE_CLASSIFICATION_BY_ID](context, payload) {
            await fetch(ARTICLE_CLASSIFY, {
                method: "delete",
                body: {
                    id: payload._id
                }
            });
        },
        //update or insert one
        [UPDATE_CLASSIFICATION_ITEM](context, payload) {
            return fetch(ARTICLE_CLASSIFY, {
                method: payload.method,
                body: payload.body
            });
        },
    }
}

export default classification;