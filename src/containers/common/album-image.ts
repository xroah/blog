import AlbumImages from "@common/album-image";
import { connect } from "react-redux";
import {
     FETCH_IMAGES_START,
     EMPTY_IMAGES,
     SHOW_UPLOAD_DIALOG,
     FETCH_ALBUM_BY_ID_START
 } from "@redux/actions";
 import {
     ADMIN_ALBUM_URL,
     PUBLIC_ALBUM_URL
 } from "@common/api";

export default connect(
    (state: any) => ({
        list: state.albumImage.list,
        started: state.albumImage.started,
        curAlbum: state.albumImage.curAlbum,
    }),
    (dispatch, ownProps: any)=> ({
        fetchImages(id: string, callback?: Function) {
            dispatch({
                ...FETCH_IMAGES_START,
                url: ownProps.url,
                id,
                callback
            });
        },
        fetchAlbum(id: string) {
            dispatch({
                ...FETCH_ALBUM_BY_ID_START,
                id,
                url: ownProps.isAdmin ? ADMIN_ALBUM_URL : PUBLIC_ALBUM_URL
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