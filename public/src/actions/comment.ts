export const FETCH_COMMENT_LIST = "FETCH_COMMENT_LIST";
export const CONCAT_COMMENT_LIST = "CONCAT_COMMENT_LIST";
export const WATCH_FETCH_COMMENT_LIST = "WATCH_FETCH_COMMENT_LIST";
export const UPDATE_COMMENT_ERROR = "UPDATE_COMMENT_ERROR";
export const UPDATE_COMMENT_LOADING = "UPDATE_COMMENT_LOADING";
export const UPDATE_PUBLISH_STATUS = "UPDATE_PUBLISH_STATUS";
export const INSERT_COMMENT = "INSERT_COMMENT";
export const PUBLISH_COMMENT = "PUBLISH_COMMENT";

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

export function updatePublishStatus(publishing: boolean) {
    return {
        type: UPDATE_PUBLISH_STATUS,
        publishing
    };
}

export function insertComment(comment: any) {
    return {
        type: INSERT_COMMENT,
        comment
    };
}