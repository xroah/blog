import {
    UPDATE_TO_TOP_VISIBILITY,
    UPDATE_FEEDBACK_VISIBILITY,
    UPDATE_FEEDBACK_LOADING
} from "../actions";

export default (
    state = {
        toTopVisible: false,
        feedbackVisible: false,
        loading: false
    },
    action: any
) => {
    switch (action.type) {
        case UPDATE_TO_TOP_VISIBILITY:
            return {
                ...state,
                toTopVisible: action.visible
            };
        case UPDATE_FEEDBACK_VISIBILITY:
            return {
                ...state,
                feedbackVisible: action.visible
            };
        case UPDATE_FEEDBACK_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        default:
            return state;
    }
}