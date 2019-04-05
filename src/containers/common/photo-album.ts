import PhotoAlbum from "@common/photo-album";
import { connect } from "react-redux";
import {
    FETCH_ALBUMS_START,
    SHOW_ALBUM_EDIT
} from "@redux/actions";

export default connect(
    (state: any) => ({
        list: state.album.list
    }),
    (dispatch, ownProps: any) => ({
        fetchAlbums() {
            dispatch({
                ...FETCH_ALBUMS_START,
                url: ownProps.url
            });
        },
        showEdit() {
            dispatch({
                ...SHOW_ALBUM_EDIT,
                mode: "add"
            });
        }
    })
)(PhotoAlbum);