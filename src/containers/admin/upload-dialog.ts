import UploadImage from "@components/admin/upload-dialog";
import { connect } from "react-redux";
import { 
    HIDE_UPLOAD_DIALOG,
    FETCH_ALBUMS_START
 } from "@redux/actions";

export default connect(
    (state: any) => ({
        visible: state.uploadDialog.visible,
        curAlbum: state.uploadDialog.curAlbum
    }),
    dispatch => ({
        hideDialog() {
            dispatch({
                ...HIDE_UPLOAD_DIALOG
            });
        },
        updateAlbums() {
            dispatch({
                ...FETCH_ALBUMS_START
            });
        }
    })
)(UploadImage);