import ImageContextMenu from "@common/album-image/context-menu";
import { connect } from "react-redux";
import {
    DELETE_IMAGE_START,
    SHOW_IMAGE_PROPERTY,
    SET_COVER_START,
    HIDE_IMAGE_CONTEXT_MENU
} from "@redux/actions";

export default connect(
    (state: any) => ({
        visible: state.imageContextMenu.visible,
        x: state.imageContextMenu.x,
        y: state.imageContextMenu.y,
        curImage: state.imageContextMenu.curImage,
        curAlbum: state.albumImage.curAlbum
    }),
    dispatch => ({
        setCover(body: any) {
            dispatch({
                ...SET_COVER_START,
                body
            });
        },
        deleteImage(id: string) {
            dispatch({
                ...DELETE_IMAGE_START,
                id
            });
        },
        showProperty() {
            dispatch({
                ...SHOW_IMAGE_PROPERTY
            });
        },
        hideContextMenu() {
            dispatch({
                ...HIDE_IMAGE_CONTEXT_MENU
            });
        }
    })
)(ImageContextMenu);