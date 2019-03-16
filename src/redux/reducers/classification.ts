import {
    FETCH_CLS,
    SHOW_CLS_DIALOG,
    HIDE_CLS_DIALOG
} from "@redux/actions";

export default function (state = {}, action) {
    console.log(action)
    switch (action.type) {
        case FETCH_CLS.type:
            return {
                ...state,
                list: action.list
            };
        case SHOW_CLS_DIALOG:
            return {
                ...state,
                visible: true
            };
        case HIDE_CLS_DIALOG:
            return {
                ...state,
                visible: false
            };
        default:
            return state;
    }
}