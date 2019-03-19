import ViewArticle from "@components/common/view-article";
import { connect } from "react-redux";
import { FETCH_ARTICLE_BY_ID_START } from "@redux/actions";

export default connect(
    (state: any) => ({
        article: state.article.current,
        started: state.article.fetchByIdStarted
    }),
    dispatch => ({
        fetchArticle(id) {
            dispatch({
                ...FETCH_ARTICLE_BY_ID_START,
                id
            });
        }
    })
)(ViewArticle);