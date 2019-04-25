import AlbumImageItem from "@common/album-image/item";
import { connect } from "react-redux";
import {
    SHOW_IMAGE_CONTEXT_MENU,
    SWITCH_IMAGE,
    UPDATE_IMAGE_NAME_START,
} from "@redux/actions";

export default connect(
    (state: any) => ({}),
    dispatch => ({
        showContextMenu(x: number, y: number, isCover: boolean) {
            dispatch({
                ...SHOW_IMAGE_CONTEXT_MENU,
                x,
                y,
                isCover
            });
        },
        switchImage(image: any) {
            dispatch({
                ...SWITCH_IMAGE,
                image
            });
        },
        updateName(id: string, name: string, callback: Function) {
            dispatch({
                ...UPDATE_IMAGE_NAME_START,
                body: {
                   id,
                   name 
                },
                callback
            });
        }
    })
)(AlbumImageItem);