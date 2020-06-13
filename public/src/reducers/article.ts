import {
    UPDATE_ARTICLE,
    UPDATE_PAGE,
    UPDATE_LOADING,
    UPDATE_ERROR
} from "../actions";

export default (
    state = {
        list: [],
        page: 1,
        error: false,
        loading: false,
        totalPages: 1
    },
    action: any
) => {
    switch (action.type) {
        case UPDATE_ARTICLE:
            return {
                ...state,
                list: state.list.concat(action.data.list),
                totalPages: Math.ceil(action.data.total / 10)
            };
        case UPDATE_PAGE:
            return {
                ...state,
                page: action.page
            };
        case UPDATE_ERROR:
            return {
                ...state,
                error: action.error
            };
        case UPDATE_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state;

    }
}