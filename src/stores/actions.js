import { CHANGE_ARTICLE_LOAD_STATE, UPDATE_ARTICLE_LIST } from "./mutations";
import fetch from "../components/common/fetch";

export const FETCH_ADMIN_ARTICLE = "FETCH_ARTICLE_LIST";
export const DELETE_ARRTICLE = "DELETE_ARTICLE";
export const ADD_ARTICLE = "ADD_ARTICLE";
export const FETCH_PUBLIC_ARTICLE = "FETCH_PUBLIC_ARTICLE";

export const fetchAricle = (action, url) => {
    return {
        async [action]({
            state,
            commit
        }, payload = {}) {
            //if list has value and force param not passed, use original value
            let { page = 1, keywords, force } = payload;
            console.log(keywords === undefined)
            if (page !== state.current || keywords !== state.keywords) {
                //changed page or keywords
                //set force to true, for refshing the list
                force = true;
                commit({
                    type: "updateCache",
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
                let ret = await fetch(`${url}/${page}/${keywords || ""}`);
                commit({
                    type: UPDATE_ARTICLE_LIST,
                    list: ret.list,
                    count: ret.count
                });
            } catch (error) {
                commit({
                    type: "changeState",
                    error: true
                });
             }
            commit({
                type: CHANGE_ARTICLE_LOAD_STATE,
                loaded: true
            });
        }
    }
}

export const FETCH_CLASSIFICATION_LIST = "FETCH_CLASSIFICATION";
export const UPDATE_CLASSIFICATION_LIST = "UPDATE_CLASSIFICATION_LIST";
export const UPDATE_CLASSIFICATION_ITEM = "UPDATE_CLASSIFICATION_ITEM";
export const DELETE_CLASSIFICATION_BY_ID = "DELETE_CLASSFICATION_BY_ID";
export const ADD_CLASSIFICATION = "ADD_CLASSIFICATION";