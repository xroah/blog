import {
    SHOW_ALBUM_CONTEXT_MENU,
    HIDE_ALBUM_CONTEXT_MENU,
    SWITCH_ALBUM
} from "../actions";

export default (
    state = {
        visible: false,
        x: 0,
        y: 0,
        curAlbum: null
    },
    action: any
) => {
    switch (action.type) {
        case SHOW_ALBUM_CONTEXT_MENU.type:
            return {
                ...state,
                visible: true,
                x: action.x,
                y: action.y
            };
        case HIDE_ALBUM_CONTEXT_MENU.type:
            return {
                ...state,
                visible: false
            };
        case SWITCH_ALBUM.type: 
            return {
                ...state,
                curAlbum: action.album
            };
        default: 
            return state;
    }
}