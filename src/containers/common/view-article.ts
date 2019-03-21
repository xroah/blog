import ViewArticle from "@components/common/view-article";
import { connect } from "react-redux";
import { 
    FETCH_ARTICLE_BY_ID_START,
    FETCH_ARTICLE_COMMENTS_START,
    FETCH_ARTICLE_COMMENTS
 } from "@redux/actions";

export default connect(
    (state: any) => ({
        article: state.article.current,
        started: state.article.fetchByIdStarted,
        comments: state.comment.list
    }),
    dispatch => ({
        fetchArticle(id) {
            dispatch({
                ...FETCH_ARTICLE_BY_ID_START,
                id
            });
        },
        fetchComments(articleId) {
            dispatch({
                ...FETCH_ARTICLE_COMMENTS_START,
                articleId
            });
        },
        emptyComments() {
            dispatch({
                ...FETCH_ARTICLE_COMMENTS,
                comments: []
            });
        }
    })
)(ViewArticle);