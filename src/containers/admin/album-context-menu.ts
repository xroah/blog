import PhotoAlbumContextMenu from "@components/common/photo-album/context-menu";
import { connect } from "react-redux";
import {
    HIDE_ALBUM_CONTEXT_MENU, 
    SHOW_ALBUM_EDIT,
    SHOW_ALBUM_PROPERTY,
    DELETE_ALBUM_START
} from "@redux/actions";

export default connect(
    (state: any) => ({
        visible: state.albumContextMenu.visible,
        x: state.albumContextMenu.x,
        y: state.albumContextMenu.y,
        curAlbum: state.albumContextMenu.curAlbum
    }),
    dispatch => ({
        hideContextMenu() {
            dispatch({
                ...HIDE_ALBUM_CONTEXT_MENU
            });
        },
        showEdit() {
            dispatch({
                ...SHOW_ALBUM_EDIT,
                mode: "edit"
            });
        },
        showProperty() {
            dispatch({
                ...SHOW_ALBUM_PROPERTY
            });
        },
        delAlbum(id: string) {
            dispatch({
                ...DELETE_ALBUM_START,
                id
            });
        }
    })
)(PhotoAlbumContextMenu);