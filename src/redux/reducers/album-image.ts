import {
    FETCH_IMAGES,
    EMPTY_IMAGES,
    FETCH_IMAGES_STARTED
} from "../actions";

export default (
    state = {
        list: [],
        started: false
    },
    action: any
) => {
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
        case FETCH_IMAGES_STARTED: 
            return {
                ...state,
                started: action.started
            };
        default:
            return state;
    }
}