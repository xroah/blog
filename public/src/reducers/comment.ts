import {
    FETCH_COMMENT_LIST,
    CONCAT_COMMENT_LIST,
    UPDATE_COMMENT_ERROR,
    UPDATE_COMMENT_LOADING
} from "../actions";

export default function comment(
    state = {
        list: [],
        error: false,
        loading: false
    },
    action: any
) {
    switch (action.type) {
        case FETCH_COMMENT_LIST:
            return {
                ...state,
                list: action.list
            };
        case CONCAT_COMMENT_LIST:
            return {
                ...state,
                list: state.list.concat(action.list)
            };
        case UPDATE_COMMENT_ERROR:
            return {
                ...state,
                error: action.error
            };
        case UPDATE_COMMENT_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state;
    }
}