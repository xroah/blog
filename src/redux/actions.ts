export const SHOW_ARTICLE_DETAILS = {
    type: "SHOW_ARTICLE_DETAILS",
    index: 0
};

export const HIDE_ARTICLES_DETAILS = {
    type: "HIDE_ARTICLES_DETAILS"
};

export const FETCH_ARTICLES_START = {
    type: "FETCH_ARTICLE_START"
};

export const FETCH_ARTICLES = {
    type: "FETCH_ARTICLES",
    list: [],
    total: 0
};

export const EMPTY_ADMIN_ARTICLES = {
    type: "EMPTY_ADMIN_ARTICLES"
};

export const FETCH_ARTICLE_BY_ID = {
    type: "FETCH_ARTICLE_BY_ID",
    id: ""
};

export const FETCH_ARTICLE_BY_ID_START = {
    type: "FETCH_ARTICLE_BY_ID_START"
};

export const FETCH_ARTICLE_STARTED = {
    type: "FETCH_ARTICLE_STARTED",
    started: false
};

export const ADMIN_UPDATE_ARTICLE_PAGE = {
    type: "ADMIN_UPDATE_ARTICLE_PAGE",
    page: 1
};

export const FETCH_PUBLIC_ARTICLES = {
    type: "FETCH_PUBLIC_ARTICLES",
    list: []
};

export const FETCH_PUBLIC_ARTICLES_START = {
    type: "FETCH_PUBLIC_ARTICLES_START"
};

export const EMPTY_PUBLIC_ARTICLES = {
    type: "EMPTY_PUBLIC_ARTICLES"
};

export const UPDATE_PUBLIC_ARTICLE_PAGE = {
    type: "UPDATE_PUBLIC_ARTICLE_PAGE",
    page: 1
};

export const UPDATE_NO_MORE_ARTICLE= {
    type: "UPDATE_NO_MORE_ARTICLE",
    hasMore: true
};

export const FETCH_ARTICLE_COMMENTS = {
    type: "FETCH_ARTICLE_COMMENTS",
    comments: []
};

export const FETCH_ARTICLE_COMMENTS_START = {
    type: "FETCH_ARTICLE_COMMENTS_START"
};

export const SAVE_ARTICLE_COMMENTS_START = {
    type: "SAVE_ARTICLE_COMMENTS_START"
};

export const EMPTY_COMMENT = {
    type: "EMPTY_COMMENT"
};

export const DELETE_ARTICLE_START = {
    type: "DELETE_ARTICLES_START",
    id: ""
};/* 

export const EDIT_ARTICLE = {
    type: "EDIT_ARTICLE",
    body: {}
}; */

export const EDIT_ARTICLE_START = {
    type: "EDIT_ARTICLE_START"
};

export const SAVE_ARTICLE_TO_DRAFTS_START = {
    type: "SAVE_ARTICLE_TO_DRAFTS_START"
};

export const FETCH_DRAFTS = {
    type: "FETCH_DRAFTS"
};

export const FETCH_DRAFTS_START = {
    type: "FETCH_DRAFTS_START"
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
        id: "", //the classification id(when edit)
        type: "", //add or edit
        value: ""
    }
}

export const SHOW_ALBUM_CONTEXT_MENU = {
    type: "SHOW_ALBUM_CONTEXT_MENU"
};

export const HIDE_ALBUM_CONTEXT_MENU = {
    type: "HIDE_ALBUM_CONTEXT_MENU"
};

export const FETCH_ALBUMS = {
    type: "FETCH_ADMIN_ALBUMS"
};

export const FETCH_ALBUMS_START = {
    type: "FETCH_ALBUMS_START"
};

export const FETCH_ALBUM_BY_ID = {
    type: "FETCH_ALBUM_BY_ID"
};

export const FETCH_ALBUM_BY_ID_START = {
    type: "FETCH_ALBUM_BY_ID_START"
};

export const ADD_ALBUM_START = {
    type: "ADD_ALBUM_START"
};

export const DELETE_ALBUM_START = {
    type: "DEL_ALBUM_START"
};

export const SHOW_ALBUM_EDIT = {
    type: "SHOW_ALBUM_EDIT"
};

export const HIDE_ALBUM_EDIT = {
    type: "HIDE_ALBUM_EDIT"
};

export const SHOW_ALBUM_PROPERTY = {
    type: "SHOW_ALBUM_PROPERTY"
};

export const HIDE_ALBUM_PROPERTY = {
    type: "HIDE_ALBUM_PROPERTY"
};

export const SWITCH_ALBUM = {
    type: "SWITCH_ALBUM",
    curAlbum: null
};

export const FETCH_IMAGES = {
    type: "FETCH_IMAGES",
    list: []
};

export const FETCH_IMAGES_START = {
    type: "FETCH_IMAGES_START"
};

export const FETCH_IMAGES_STARTED = {
    type: "FEtCH_IMAGES_STARTED",
    started: false
};

export const UPLOAD_IMAGES_START = {
    type: "UPLOAD_IMAGES_START"
};

export const EMPTY_IMAGES = {
    type: "EMPTY_IMAGES"
};

export const SHOW_UPLOAD_DIALOG = {
    type: "SHOW_UPLOAD_DIALOG"
};

export const HIDE_UPLOAD_DIALOG = {
    type: "HIDE_UPLOAD_DIALOG"
};

export const DELETE_IMAGE_BY_ID = {
    type: "DELETE_IMAGE_BY_ID"
};

export const UPDATE_IMAGE_NAME_BY_ID = {
    type: "UPDATE_IMAGE_NAME_BY_ID"
};

export const SHOW_IMAGE_CONTEXT_MENU = {
    type: "SHOW_IMAGE_CONTEXT_MENU"
};

export const HIDE_IMAGE_CONTEXT_MENU = {
    type: "HIDE_IMAGE_CONTEXT_MENU"
};

export const DELETE_IMAGE_START = {
    type: "DELETE_IMAGE_START"
};

export const UPDATE_IMAGE_NAME_START = {
    type: "UPDATE_IMAGE_NAME_START"
};

export const SHOW_IMAGE_PROPERTY = {
    type: "SHOW_IMAGE_INFO"
};

export const HIDE_IMAGE_PROPERTY = {
    type: "HIDE_IMAGE_INFO"
};

export const SET_COVER_START = {
    type: "SET_COVER_START"
};

export const UPDATE_CUR_ALBUM_COVER = {
    type: "UPDATE_CUR_ALBUM_COVER"
};

export const SWITCH_IMAGE = {
    type: "SWITCH_IMAGE"
};

export const ALBUM_START_LOADING = {
    type: "ALBUM_START_LOADING"
};

export const ALBUM_STOP_LOADING = {
    type: "ALBUM_STOP_LOADING"
};