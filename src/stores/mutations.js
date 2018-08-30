
export const UPDATE_ARTICLE_LIST = "UPDATE_ARTICLE_LIST";
export const CHANGE_ARTICLE_LOAD_STATE = "CHANGE_ARTICLE_LOAD_STATE";

const PAGE_SIZE = 10; //number of per page

export const updateArticle = {
    [UPDATE_ARTICLE_LIST](state, payload) {
        if (payload.count !== undefined) {
            state.total = Math.ceil(payload.count / PAGE_SIZE);
        }
        state.list = payload.list;
    },
    [CHANGE_ARTICLE_LOAD_STATE](state, payload) {
        state.loaded = payload.loaded;
    },
    updateCache(state, payload) {
        //cache previos page and keywords
        //if the page or keywords changed, refresh the list
        state.current = payload.page;
        state.keywords = payload.keywords;
    }
}