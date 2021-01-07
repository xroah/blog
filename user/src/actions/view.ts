export const FETCH_ARTICLE_BY_ID = "FETCH_ARTICLE_BY_ID";
export const WATCH_FETCH_ARTICLE_BY_ID = "WATCH_FETCH_ARTICLE_BY_ID";
export const FETCH_PREV_AND_NEXT = "FETCH_PREV_AND_NEXT";
export const WATCH_FETCH_PREV_AND_NEXT = "WATCH_FETCH_PREV_AND_NEXT";

export function updateArticle(article: any) {
    return {
        type: FETCH_ARTICLE_BY_ID,
        article
    };
}

export function updatePrevNext(payload: any) {
    return {
        type: FETCH_PREV_AND_NEXT,
        payload
    };
}