import {
    FETCH_ARTICLE_COMMENTS
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
        default:
            return state;
    }
}