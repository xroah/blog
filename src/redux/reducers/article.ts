import {
    SHOW_ARTICLE_DETAILS,
    FETCH_ARTICLES,
    HIDE_ARTICLES_DETAILS
} from "../actions";

export default function (
    state = {
        list: [],
        index: -1,
        visible: false,
        current: ""
    }, action
) {
    switch (action.type) {
        case SHOW_ARTICLE_DETAILS.type:
            return {
                ...state,
                index: action.index,
                visible: true
            };
        case HIDE_ARTICLES_DETAILS.type:
            return {
                ...state,
                visible: false
            };
        case FETCH_ARTICLES.type:
            return {
                ...state,
                list: action.list
            };
        default:
            return state;
    }
}