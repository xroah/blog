import {
    SHOW_ALBUM_CONTEXT_MENU,
    HIDE_ALBUM_CONTEXT_MENU
} from "../actions";

export default (
    state = {
        visible: false,
        x: 0,
        y: 0
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
        default: 
            return state;
    }
}