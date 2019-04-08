import {
    SHOW_UPLOAD_DIALOG,
    HIDE_UPLOAD_DIALOG
} from "../actions"

export default (
    state = {
        visible: false
    },
    action: any
) => {
    switch (action.type) {
        case SHOW_UPLOAD_DIALOG.type:
            return {
                ...state,
                visible: true
            };
        case HIDE_UPLOAD_DIALOG.type:
            return {
                ...state,
                visible: false
            };
        default:
            return state;
    }
}