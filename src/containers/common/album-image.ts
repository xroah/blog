import AlbumImages from "@common/album-image";
import { connect } from "react-redux";
import {
     FETCH_IMAGES_START,
     EMPTY_IMAGES,
     SHOW_UPLOAD_DIALOG,
     DELETE_IMAGE_BY_ID,
     FETCH_ALBUMS_START,
     UPDATE_IMAGE_NAME_BY_ID
 } from "@redux/actions";

export default connect(
    (state: any) => ({
        list: state.albumImage.list,
        started: state.albumImage.started
    }),
    (dispatch, ownProps: any)=> ({
        fetchImages(id: string) {
            dispatch({
                ...FETCH_IMAGES_START,
                url: ownProps.url,
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
        },
        deleteImageById(id: string) {
            dispatch({
                ...DELETE_IMAGE_BY_ID,
                id
            });
        },
        updateAlbums() {
            dispatch({
                ...FETCH_ALBUMS_START
            });
        },
        updateImageName(id: string, name: string) {
            dispatch({
                ...UPDATE_IMAGE_NAME_BY_ID,
                id,
                name
            });
        }
    })
)(AlbumImages);