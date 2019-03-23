import {
    FETCH_ARTICLE_COMMENTS,
    EMPTY_COMMENT
} from "../actions";

export default (state = {
    list: []
}, action) => {
    switch (action.type) {
        case FETCH_ARTICLE_COMMENTS.type:
            return {
                ...state,
                list: action.comments
            };
        case EMPTY_COMMENT.type:
            return {
                ...state,
                list: []
            };
        default:
            return state;
    }
}