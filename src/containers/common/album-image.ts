import AlbumImages from "@common/album-image";
import { connect } from "react-redux";
import {
     FETCH_IMAGES_START,
     EMPTY_IMAGES
 } from "@redux/actions";

export default connect(
    (state: any) => ({
        list: state.albumImage.list,
        started: state.albumImage.started,
        curAlbum: state.albumContextMenu.curAlbum
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
        }
    })
)(AlbumImages);