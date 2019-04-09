import {
    SHOW_UPLOAD_DIALOG,
    HIDE_UPLOAD_DIALOG
} from "../actions"

export default (
    state = {
        visible: false,
        curAlbum: null
    },
    action: any
) => {
    switch (action.type) {
        case SHOW_UPLOAD_DIALOG.type:
            return {
                ...state,
                visible: true,
                curAlbum: action.album
            };
        case HIDE_UPLOAD_DIALOG.type:
            return {
                ...state,
                visible: false,
                curAlbum: null
            };
        default:
            return state;
    }
}