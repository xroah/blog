import { connect } from "react-redux";
import {
    WATCH_FETCH_ARTICLE_BY_ID,
    WATCH_FETCH_PREV_AND_NEXT,
    updateArticle
} from "../actions";
import ViewArticle from "../components/view-article";

export default connect(
    (state: any) => ({
        article: state.view.article,
        next: state.view.next,
        prev: state.view.prev
    }),
    dispatch => ({
        fetchArticle(id: string) {
            dispatch({
                type: WATCH_FETCH_ARTICLE_BY_ID,
                articleId: id
            })
        },
        fetchPrevNext(id: string) {
            dispatch({
                type: WATCH_FETCH_PREV_AND_NEXT,
                articleId: id
            });
        },
        updateArticle(article: any) {
            dispatch(updateArticle(article));
        }
    })
)(ViewArticle);