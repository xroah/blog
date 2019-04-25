import {
    FETCH_IMAGES,
    EMPTY_IMAGES,
    FETCH_IMAGES_STARTED,
    DELETE_IMAGE_BY_ID,
    UPDATE_IMAGE_NAME_BY_ID,
    SHOW_IMAGE_PROPERTY,
    HIDE_IMAGE_PROPERTY,
    FETCH_ALBUM_BY_ID,
    UPDATE_CUR_ALBUM_COVER
} from "../actions";

export default (
    state = {
        list: [],
        started: false,
        propertyVisible: false,
        curAlbum: null
    },
    action: any
) => {
    let list: any[];
    switch (action.type) {
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
        case SHOW_IMAGE_PROPERTY.type:
            return {
                ...state,
                propertyVisible: true
            };
        case HIDE_IMAGE_PROPERTY.type:
            return {
                ...state,
                propertyVisible: false
            };
        case FETCH_IMAGES_STARTED.type:
            return {
                ...state,
                started: action.started
            };
        case FETCH_ALBUM_BY_ID.type:
            return {
                ...state,
                curAlbum: action.album
            };
        case UPDATE_CUR_ALBUM_COVER.type:
            let curAlbum = { ...state.curAlbum };
            if (curAlbum.coverInfo) {
                curAlbum.coverInfo._id = action.id;
            } else {
                curAlbum.coverInfo = { _id: action.id };
            }
            return {
                ...state,
                curAlbum
            };
        case DELETE_IMAGE_BY_ID.type:
            const id = action.id;
            list = state.list.slice();
            for (let i = list.length; i--;) {
                let _id = list[i]._id;
                //delete multiple images
                if (Array.isArray(id)) {
                    let index = id.indexOf(_id);
                    if (index >= 0) {
                        id.splice(index, 1);
                        list.splice(i, 1);
                    }
                    if (!id.length) {
                        break;
                    }
                } else {
                    if (_id === id) {
                        list.splice(i, 1);
                        break;
                    }
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