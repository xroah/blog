import { connect } from "react-redux";
import EditDialog from "@components/admin/classification/edit-dialog";
import { 
    HIDE_CLS_DIALOG,
    EDIT_CLS_START
 } from "@redux/actions";

export default connect(
    (state: any) => ({
        visible: state.cls.visible,
        ...state.cls.info
    }),
    (dispatch) => ({
        hideDialog() {
            dispatch({
                ...HIDE_CLS_DIALOG
            });
        },
        save(info) {
            dispatch({
                ...EDIT_CLS_START,
                ...info
            });
        }
    })
)(EditDialog);