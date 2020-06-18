import {
    FETCH_COMMENT_LIST,
    CONCAT_COMMENT_LIST,
    UPDATE_COMMENT_ERROR,
    UPDATE_COMMENT_LOADING,
    INSERT_COMMENT
} from "../actions";

export default function comment(
    state = {
        list: [],
        error: false,
        loading: false
    },
    action: any
) {
    switch (action.type) {
        case FETCH_COMMENT_LIST:
            return {
                ...state,
                list: action.list || []
            };
        case CONCAT_COMMENT_LIST:
            return {
                ...state,
                list: state.list.concat(action.list)
            };
        case INSERT_COMMENT:
            const c: any = action.comment;
            
            if (!c) return state;
            
            const _state: any = {...state};
            _state.list = [...state.list];

            //root comment
            if (!c.root) {
                _state.list.unshift(c);
            } else { //sub comment
                for (let l of _state.list) {
                    if (c.root === l._id) {
                        if (l.children) {
                            l.children = [];
                        }

                        l.children.push(c);
                        break;
                    }
                }
            }

            return _state;
        case UPDATE_COMMENT_ERROR:
            return {
                ...state,
                error: action.error
            };
        case UPDATE_COMMENT_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state;
    }
}