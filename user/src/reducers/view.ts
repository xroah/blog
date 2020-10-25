import { FETCH_ARTICLE_BY_ID, FETCH_PREV_AND_NEXT } from "../actions";

export default (
    state = {
        article: null,
        prev: null,
        next: null
    },
    action: any
) => {
    switch (action.type) {
        case FETCH_ARTICLE_BY_ID:
            return {
                ...state,
                article: action.article
            }
        case FETCH_PREV_AND_NEXT:
            return {
                ...state,
                prev: action.payload.prev,
                next: action.payload.next
            }
        default:
            return state;
    }
}