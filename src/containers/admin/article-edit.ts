import ArticleEdit from "@components/admin/article-edit";
import { connect } from "react-redux";
import {
    EDIT_ARTICLE_START,
    CHANGE_ARTICLE_NOT_SAVED,
    CHANGE_ARTICLE_SAVED,
    FETCH_ARTICLE_BY_ID_START
} from "@redux/actions";

export default connect(
    (state: any) => ({
        saved: state.article.saved
    }),
    dispatch => ({
        saveArticle(body) {
            dispatch({
                ...EDIT_ARTICLE_START,
                body
            });
        },
        changeSaved(saved) {
            let action = saved ? CHANGE_ARTICLE_SAVED : CHANGE_ARTICLE_NOT_SAVED;
            dispatch({
                ...action
            });
        },
        fetchArticleById(id: string,success: Function, error: Function) {
            dispatch({
                ...FETCH_ARTICLE_BY_ID_START,
                id,
                success,
                error
            });
        }
    })
)(ArticleEdit);