export const FETCH_COMMENT_LIST = "FETCH_COMMENT_LIST";
export const CONCAT_COMMENT_LIST = "CONCAT_COMMENT_LIST";
export const WATCH_FETCH_COMMENT_LIST = "WATCH_FETCH_COMMENT_LIST";
export const UPDATE_COMMENT_ERROR = "UPDATE_COMMENT_ERROR";
export const UPDATE_COMMENT_LOADING = "UPDATE_COMMENT_LOADING";

export function updateCommentList(list: any[]) {
    return {
        type: FETCH_COMMENT_LIST,
        list: list
    };
}

export function concatCommentList(list: any[]) {
    return {
        type: CONCAT_COMMENT_LIST,
        list
    };
}

export function updateCommentError(error: boolean) {
    return {
        type: UPDATE_COMMENT_ERROR,
        error
    };
}

export function updateCommentLoading(loading: boolean) {
    return {
        type: UPDATE_COMMENT_LOADING,
        loading
    };
}