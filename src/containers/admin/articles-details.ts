import { connect } from "react-redux";
import { HIDE_ARTICLES_DETAILS } from "@redux/actions";
import ArticleDetails from "@components/admin/article-details";

export default connect(
    (state: any) => ({
        index: state.adminArticle.index,
        visible: state.adminArticle.visible,
        list: state.adminArticle.list
    }),
    dispatch => ({
        hideDialog() {
            dispatch({
                ...HIDE_ARTICLES_DETAILS
            });
        }
    })
)(ArticleDetails);