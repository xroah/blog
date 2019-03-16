import {
    FETCH_CLS,
    SHOW_CLS_DIALOG,
    HIDE_CLS_DIALOG,
    EDIT_CLS_INFO
} from "@redux/actions";

export default function (state = {visible: false, value: ""}, action) {
    switch (action.type) {
        case FETCH_CLS.type:
            return {
                ...state,
                list: action.list
            };
        case SHOW_CLS_DIALOG.type:
            return {
                ...state,
                visible: true
            };
        case HIDE_CLS_DIALOG.type:
            return {
                ...state,
                visible: false
            };
        case EDIT_CLS_INFO.type:
            return {
                ...state,
                info: action.info
            };
        default:
            return state;
    }
}