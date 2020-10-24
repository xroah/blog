export const UPDATE_ARTICLE = "FETCH_ARTICLE";
export const EMPTY_ARTICLE = "EMPTY_ARTICLE"
export const WATCH_FETCH_ARTICLE = "WATCH_FETCH_ARTICLE";
export const UPDATE_PAGE = "UPDATE_PAGE";
export const UPDATE_ERROR = "UPDATE_ERROR";
export const UPDATE_LOADING = "UPDATE_LOADING";
export const UPDATE_PULL_REFRESH_STATE = "UPDATE_PULL_REFRESH_STATE"

export function updateArticles(data: any) {
    return {
        type: UPDATE_ARTICLE,
        data
    };
}

export function emptyArticle() {
    return {
        type: EMPTY_ARTICLE
    }
}

export function updatePage(page: number) {
    return {
        type: UPDATE_PAGE,
        page
    };
}

export function updateError(error: boolean) {
    return {
        type: UPDATE_ERROR,
        error
    };
}

export function updateLoading(loading: boolean) {
    return {
        type: UPDATE_LOADING,
        loading
    };
}

export function updatePullRefreshState(state?: string) {
    return {
        type: UPDATE_PULL_REFRESH_STATE,
        state
    }
}