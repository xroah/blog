import {
    FETCH_ALBUMS,
    SHOW_ALBUM_EDIT,
    HIDE_ALBUM_EDIT,
    SHOW_ALBUM_PROPERTY,
    HIDE_ALBUM_PROPERTY,
    ALBUM_START_LOADING,
    ALBUM_STOP_LOADING
} from "../actions";

export default (
    state = {
        list: [],
        editVisible: false,
        propertyVisible: false,
        mode: "add",
        loading: false
    },
    action: any
) => {
    switch (action.type) {
        case ALBUM_START_LOADING.type: 
            return {
                ...state,
                loading: true
            };
        case ALBUM_STOP_LOADING.type:
            return {
                ...state,
                loading: false
            };
        case FETCH_ALBUMS.type:
            return {
                ...state,
                list: action.list
            };
        case SHOW_ALBUM_EDIT.type:
            return {
                ...state,
                editVisible: true,
                mode: action.mode
            };
        case HIDE_ALBUM_EDIT.type:
            return {
                ...state,
                editVisible: false
            };
        case SHOW_ALBUM_PROPERTY.type: 
            return {
                ...state,
                propertyVisible: true
            };
        case HIDE_ALBUM_PROPERTY.type: 
            return {
                ...state,
                propertyVisible: false
            };
        default:
            return state;
    }
}