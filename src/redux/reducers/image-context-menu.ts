import {
    SHOW_IMAGE_CONTEXT_MENU,
    HIDE_IMAGE_CONTEXT_MENU,
    SWITCH_IMAGE
} from "../actions";

export default (
    state = {
        visible: false,
        x: 0,
        y: 0,
        curImage: null,
        isCover: false
    },
    action: any
) => {
    switch (action.type) {
        case SHOW_IMAGE_CONTEXT_MENU.type:
            return {
                ...state,
                x: action.x,
                y: action.y,
                isCover: action.isCover,
                visible: true
            };
        case HIDE_IMAGE_CONTEXT_MENU.type:
            return {
                ...state,
                visible: false,
                isCover: false
            };
        case SWITCH_IMAGE.type:
            return {
                ...state,
                curImage: action.image
            };
        default:
            return state;
    }
}