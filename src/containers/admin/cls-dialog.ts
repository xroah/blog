import { connect } from "react-redux";
import ClsList from "@components/admin/classification/edit-dialog";
import { HIDE_CLS_DIALOG } from "@redux/actions";

export default connect(
    (state: any) => ({
        visible: state.cls.visible
    }),
    (dispatch) => ({
        hideDialog() {
            dispatch({
                ...HIDE_CLS_DIALOG
            });
        }
    })
)(ClsList);