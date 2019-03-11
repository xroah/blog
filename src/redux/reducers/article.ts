import { 
    SHOW_ARTICLE_DETAILS,
    FETCH_ARTICLES
 } from "../actions";

export default function (state = {}, action) {
    switch (action.type) {
        case SHOW_ARTICLE_DETAILS.type:
            return {
                ...state,
                index: action.index
            };
        case FETCH_ARTICLES.type:
            return {
                ...state,
                articles: action.articles
            };
        default:
            return state;
    }
}