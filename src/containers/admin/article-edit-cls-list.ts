import ClsList from "@components/admin/article-edit/cls-list";
import { connect } from "react-redux";
import { FETCH_CLS_START } from "@redux/actions";

export default connect(
    (state: any) => ({
        list: state.cls.list
    }),
    dispatch => ({
        fetchCls() {
            dispatch({
                ...FETCH_CLS_START
            });
        }
    })
)(ClsList);