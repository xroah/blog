import { FETCH_DRAFTS_START } from "@redux/actions";
import Drafts from "@components/admin/articles/draft";
import { connect } from "react-redux";

export default connect(
    (state: any ) => ({
        list: state.adminArticle.drafts,
        started: state.commonArticle.started
    }),
    (dispatch) => ({
        fetchDrafts() {
            dispatch({
                ...FETCH_DRAFTS_START
            });
        }
    })
)(Drafts);