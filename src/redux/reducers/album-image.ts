import {
    FETCH_IMAGES,
    EMPTY_IMAGES,
    FETCH_IMAGES_STARTED,
    DELETE_IMAGE_BY_ID,
    UPDATE_IMAGE_NAME_BY_ID
} from "../actions";

export default (
    state = {
        list: [],
        started: false
    },
    action: any
) => {
    let list: any[];
    switch(action.type) {
        case FETCH_IMAGES.type: 
            return {
                ...state,
                list: state.list.concat(action.images)
            };
        case EMPTY_IMAGES.type:
            return {
                ...state,
                list: []
            };
        case FETCH_IMAGES_STARTED.type: 
            return {
                ...state,
                started: action.started
            };
        case DELETE_IMAGE_BY_ID.type: 
            list = state.list.slice();
            for (let i = 0, l = list.length; i < l; i++) {
                if (list[i]._id === action.id) {
                    list.splice(i, 1);
                    break;
                }
            }
            return {
                ...state,
                list
            };
        case UPDATE_IMAGE_NAME_BY_ID.type:
            list = state.list.slice();
            for (let i = 0, l = list.length; i < l; i++) {
                let tmp = list[i];
                if (tmp._id === action.id) {
                    tmp.name = action.name;
                    list[i] = tmp;
                    break;
                }
            }
            return {
                ...state,
                list
            };
        default:
            return state;
    }
}