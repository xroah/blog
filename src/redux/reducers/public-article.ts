import {
    FETCH_PUBLIC_ARTICLES,
    EMPTY_PUBLIC_ARTICLES,
    UPDATE_PUBLIC_ARTICLE_PAGE
} from "../actions";

export default (state = {
    list: [],
    page: 1
}, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_ARTICLES.type:
            return {
                ...state,
                list: state.list.concat(action.articles)
            };
        case EMPTY_PUBLIC_ARTICLES:
            return {
                ...state,
                list: []
            };
        case UPDATE_PUBLIC_ARTICLE_PAGE.type:
            return {
                ...state,
                page: action.page
            };
        default:
            return state;
    }
}