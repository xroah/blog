import PhotoAlbumContextMenu from "@components/common/photo-album/context-menu";
import { connect } from "react-redux";
import {
    HIDE_ALBUM_CONTEXT_MENU
} from "@redux/actions";

export default connect(
    (state: any) => ({
        visible: state.photoAlbum.visible,
        x: state.photoAlbum.x,
        y: state.photoAlbum.y
    }),
    dispatch => ({
        hideContextMenu() {
            dispatch({
                ...HIDE_ALBUM_CONTEXT_MENU
            });
        }
    })
)(PhotoAlbumContextMenu);