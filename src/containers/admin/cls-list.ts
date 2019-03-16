import { connect } from "react-redux";
import ClsList from "@components/admin/classification/list";
import {
    DELETE_CLS_START,
    FETCH_CLS_START,
    SHOW_CLS_DIALOG
} from "@redux/actions";

export default connect(
    (state: any) => ({
        list: state.cls.list
    }),
    (dispatch) => ({
        fetchCls() {
            dispatch({
                ...FETCH_CLS_START
            });
        },
        showEditDialog() {
            dispatch({
                ...SHOW_CLS_DIALOG
            });
        }
    })
)(ClsList);