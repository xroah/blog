import {
    FETCH_PUBLIC_ARTICLES,
    EMPTY_PUBLIC_ARTICLES,
    UPDATE_PUBLIC_ARTICLE_PAGE,
    UPDATE_NO_MORE_ARTICLE
} from "../actions";

export default (state = {
    list: [],
    page: 1,
    hasMore: true
}, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_ARTICLES.type:
            return {
                ...state,
                list: state.list.concat(action.articles)
            };
        case EMPTY_PUBLIC_ARTICLES.type:
            return {
                ...state,
                list: []
            };
        case UPDATE_PUBLIC_ARTICLE_PAGE.type:
            return {
                ...state,
                page: action.page
            };
        case UPDATE_NO_MORE_ARTICLE.type:
            return {
                ...state,
                hasMore: action.hasMore
            };
        default:
            return state;
    }
}