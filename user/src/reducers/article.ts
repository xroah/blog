import {
    UPDATE_ARTICLE,
    UPDATE_PAGE,
    UPDATE_LOADING,
    UPDATE_ERROR,
    EMPTY_ARTICLE,
    UPDATE_PULL_REFRESH_STATE
} from "../actions";

export interface ArticleState {
    list: any[]
    page: number
    error: boolean
    loading: boolean
    totalPages: number
    pullRefreshState?: string
}

export default (
    state: ArticleState = {
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
        case EMPTY_ARTICLE:
            return {
                ...state,
                list: [],
                totalPages: 1
            }
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
        case UPDATE_PULL_REFRESH_STATE:
            return {
                ...state,
                pullRefreshState: action.state
            }
        default:
            return state;

    }
}