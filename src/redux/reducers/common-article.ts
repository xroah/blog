import {
    FETCH_ARTICLE_BY_ID,
    FETCH_ARTICLE_STARTED
} from "../actions";

export default function (
    state = {
        current: null, //view article component, current article
        started: false
    }, action
) {
    switch (action.type) {
        case FETCH_ARTICLE_BY_ID.type:
            return {
                ...state,
                current: action.article
            };
        case FETCH_ARTICLE_STARTED.type:
            return {
                ...state,
                started: action.started
            };
        default:
            return state;
    }
}