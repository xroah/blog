import {
    SHOW_ARTICLE_DETAILS,
    FETCH_ARTICLES,
    HIDE_ARTICLES_DETAILS,
    CHANGE_ARTICLE_SAVED,
    CHANGE_ARTICLE_NOT_SAVED,
    FETCH_ARTICLE_BY_ID
} from "../actions";

export default function (
    state = {
        list: [],
        //get article from list by index
        index: -1,
        //whether detail dialog is visible
        visible: false,
        //view article component, current article
        current: null,
        //edit component, if not saved will show prompt before route change
        saved: false
    }, action
) {
    switch (action.type) {
        case FETCH_ARTICLES.type:
            return {
                ...state,
                list: action.list
            };
        case SHOW_ARTICLE_DETAILS.type:
            return {
                ...state,
                index: action.index,
                visible: true
            };
        case FETCH_ARTICLE_BY_ID.type:
            return {
                ...state,
                current: action.article
            };
        case HIDE_ARTICLES_DETAILS.type:
            return {
                ...state,
                visible: false
            };
        case CHANGE_ARTICLE_SAVED.type:
            return {
                ...state,
                saved: true
            };
        case CHANGE_ARTICLE_NOT_SAVED.type:
            return {
                ...state,
                saved: false
            }
        default:
            return state;
    }
}