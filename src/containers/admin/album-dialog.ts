import AlbumDialog from "@components/admin/album-dialog";
import { connect } from "react-redux";
import {
    HIDE_ALBUM_EDIT,
    ADD_ALBUM_START
} from "@redux/actions";

export default connect(
    (state: any) => ({
        visible: state.album.editVisible,
        curAlbum: state.albumContextMenu.curAlbum,
        mode: state.album.mode
    }),
    dispatch => ({
        hideDialog() {
            dispatch({
                ...HIDE_ALBUM_EDIT
            });
        },
        save(body: Object, success: Function, error: Function) {
            dispatch({
                ...ADD_ALBUM_START,
                body,
                success,
                error
            });
        }
    })
)(AlbumDialog);