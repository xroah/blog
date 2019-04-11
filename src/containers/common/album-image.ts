import AlbumImages from "@common/album-image";
import { connect } from "react-redux";
import {
     FETCH_IMAGES_START,
     EMPTY_IMAGES,
     SHOW_UPLOAD_DIALOG,
     DELETE_IMAGE_BY_ID,
     FETCH_ALBUMS_START,
     UPDATE_IMAGE_NAME_BY_ID,
     FETCH_ALBUM_BY_ID_START
 } from "@redux/actions";

export default connect(
    (state: any) => ({
        list: state.albumImage.list,
        started: state.albumImage.started,
        curAlbum: state.albumImage.curAlbum,
    }),
    (dispatch, ownProps: any)=> ({
        fetchImages(id: string) {
            dispatch({
                ...FETCH_IMAGES_START,
                url: ownProps.url,
                id
            });
        },
        fetchAlbum(id: string) {
            dispatch({
                ...FETCH_ALBUM_BY_ID_START,
                id
            });
        },
        emptyImages() {
            dispatch({
                ...EMPTY_IMAGES
            });
        },
        showUpload(album: any) {
            dispatch({
                ...SHOW_UPLOAD_DIALOG,
                album
            });
        }
    })
)(AlbumImages);