import PhotoAlbumItem from "@components/common/photo-album/item";
import { connect } from "react-redux";
import {
    SHOW_ALBUM_CONTEXT_MENU,
    SWITCH_ALBUM
} from "@redux/actions";

export default connect(
    (state: any) => ({}),
    dispatch => ({
        showContextMenu(x: number, y: number) {
            dispatch({
                ...SHOW_ALBUM_CONTEXT_MENU,
                visible: true,
                x,
                y
            });
        },
        switchAlbum(album: any) {
            dispatch({
                ...SWITCH_ALBUM,
                album
            });
        }
    })
)(PhotoAlbumItem);