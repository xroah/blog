import Articles from "@components/admin/articles";
import { FETCH_ARTICLES_START } from "@redux/actions";
import { connect } from "react-redux";

export default connect(
    (state: any) => ({
        list: state.article.list,
        total: state.article.total
    }),
    dispatch => ({
        fetchArticle(page: number = 1) {
            dispatch({
                ...FETCH_ARTICLES_START,
                page
            });
        }
    })
)(Articles);