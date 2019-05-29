import {
    SHOW_ARTICLE_DETAILS,
    FETCH_ARTICLES,
    HIDE_ARTICLES_DETAILS,
    CHANGE_ARTICLE_SAVED,
    CHANGE_ARTICLE_NOT_SAVED,
    ADMIN_UPDATE_ARTICLE_PAGE,
    EMPTY_ADMIN_ARTICLES,
    FETCH_DRAFTS
} from "../actions";

export default function (
    state = {
        list: [],
        total: 0,
        //for showing details
        curArticle: null,
        //whether detail dialog is visible
        visible: false,
        //edit component, if not saved will show prompt before route change
        saved: false,
        page: 1,
        drafts: []
    }, action
) {
    switch (action.type) {
        case FETCH_ARTICLES.type:
            return {
                ...state,
                list: action.list,
                total: action.total
            };
        case EMPTY_ADMIN_ARTICLES.type:
            return {
                ...state,
                list: [],
                total: 0
            };
        case ADMIN_UPDATE_ARTICLE_PAGE.type:
            return {
                ...state,
                page: action.page
            };
        case HIDE_ARTICLES_DETAILS.type:
            return {
                ...state,
                visible: false,
                article: null
            };
        case SHOW_ARTICLE_DETAILS.type:
            return {
                ...state,
                article: action.article,
                visible: true
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
        case FETCH_DRAFTS.type: 
            return {
                ...state,
                drafts: action.list
            };
        default:
            return state;
    }
}