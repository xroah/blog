export const SHOW_ARTICLE_DETAILS = {
    type: "SHOW_ARTICLE_DETAILS",
    index: 0
};

export const FETCH_ARTICLES_START = {
    type: "FETCH_ARTICLE_START"
};

export const FETCH_ARTICLES = {
    type: "FETCH_ARTICLES",
    articles: []
};

export const FETCH_ARTICLE_ERROR = {
    type: "FETCH_ARTICLES"
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