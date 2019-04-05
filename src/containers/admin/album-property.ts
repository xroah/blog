import AlbumProperty from "@components/admin/album-property";
import { connect } from "react-redux";
import { HIDE_ALBUM_PROPERTY } from "@redux/actions";

export default connect(
    (state: any) => ({
        curAlbum: state.albumContextMenu.curAlbum,
        visible: state.album.propertyVisible
    }),
    dispatch => ({
        hideProperty() {
            dispatch({
                ...HIDE_ALBUM_PROPERTY
            });
        }
    })
)(AlbumProperty);