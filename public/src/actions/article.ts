export const UPDATE_ARTICLE = "FETCH_ARTICLE";
export const WATCH_FETCH_ARTICLE = "WATCH_FETCH_ARTICLE";
export const UPDATE_PAGE = "UPDATE_PAGE";
export const UPDATE_ERROR = "UPDATE_ERROR";
export const UPDATE_LOADING = "UPDATE_LOADING";

export function updateArticles(data: any) {
    return {
        type: UPDATE_ARTICLE,
        data
    };
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