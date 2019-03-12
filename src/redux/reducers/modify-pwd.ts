import { MODIFY_PASSWORD_SHOW, MODIFY_PASSWORD_HIDE } from "../actions";

export default (state = {visible: false}, action) => {
    switch(action.type) {
        case MODIFY_PASSWORD_SHOW.type:
            return {
                ...state,
                visible: true
            };
        case MODIFY_PASSWORD_HIDE.type:
            return {
                ...state,
                visible: false
            };
        default:
            return state;
    }
}