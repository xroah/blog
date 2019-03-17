import { connect } from "react-redux";
import { HIDE_ARTICLES_DETAILS } from "@redux/actions";
import ArticleDetails from "@components/admin/article-details";

export default connect(
    (state: any) => ({
        index: state.article.index,
        visible: state.article.visible,
        list: state.article.list
    }),
    dispatch => ({
        hideDialog() {
            dispatch({
                ...HIDE_ARTICLES_DETAILS
            });
        }
    })
)(ArticleDetails);