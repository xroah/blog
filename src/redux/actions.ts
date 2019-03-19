export const SHOW_ARTICLE_DETAILS = {
    type: "SHOW_ARTICLE_DETAILS",
    index: 0
};

export const HIDE_ARTICLES_DETAILS = {
    type: "HIDE_ARTICLES_DETAILS",
    index: -1
};

export const FETCH_ARTICLES_START = {
    type: "FETCH_ARTICLE_START"
};

export const FETCH_ARTICLES = {
    type: "FETCH_ARTICLES",
    list: [],
    total: 0
};

export const FETCH_ARTICLE_BY_ID = {
    type: "FETCH_ARTICLE_BY_ID",
    id: ""
};

export const FETCH_ARTICLE_BY_ID_START = {
    type: "FETCH_ARTICLE_BY_ID_START"
};

export const FETCH_ARTICLE_BY_ID_STARTED = {
    type: "FETCH_ARTICLE_BY_ID_STARTED",
    started: false
};

export const FETCH_ARTICLE_ERROR = {
    type: "FETCH_ARTICLES"
};

export const DELETE_ARTICLE_START = {
    type: "DELETE_ARTICLES_START",
    id: ""
};

export const CLEAR_FETCHED_BY_ID = {
    type: "CLEAR_FETCHED_BY_ID"
};

export const EDIT_ARTICLE = {
    type: "EDIT_ARTICLE",
    body: {}
};

export const EDIT_ARTICLE_START = {
    type: "EDIT_ARTICLE_START"
};

export const CHANGE_ARTICLE_SAVED = {
    type: "CHANGE_ARTICLE_SAVED"
};

export const CHANGE_ARTICLE_NOT_SAVED = {
    type: "CHANGE_ARTICLE_NOT_SAVED"
};

export const MODIFY_PASSWORD_SHOW = {
    type: "MODIFY_PASSWORD_SHOW"
}

export const MODIFY_PASSWORD_HIDE = {
    type: "MODIFY_PASSWORD_HIDE"
};

export const FETCH_CLS = {
    type: "FETCH_CLS",
    list: []
};

export const FETCH_CLS_START = {
    type: "FETCH_CLS_START"
};

export const DELETE_CLS = {
    type: "DELETE_CLS",
    id: ""
};

export const DELETE_CLS_START = {
    type: "DELETE_CLS_START"
};

export const EDIT_CLS = {
    type: "EDIT_CLS"
}

export const EDIT_CLS_START = {
    type: "EDIT_CLS_START"
};

export const SHOW_CLS_DIALOG = {
    type: "SHOW_CLS_DIALOG"
}

export const HIDE_CLS_DIALOG = {
    type: "HIDE_CLS_DIALOG"
};

export const EDIT_CLS_INFO = {
    type: "EDIT_CLS_INFO",
    info: {
        id: "",
        type: "",
        value: ""
    }
}