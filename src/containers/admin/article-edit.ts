import ArticleEdit from "@components/admin/article-edit";
import { connect } from "react-redux";
import {
    EDIT_ARTICLE_START,
    CHANGE_ARTICLE_NOT_SAVED,
    CHANGE_ARTICLE_SAVED,
    FETCH_ARTICLE_BY_ID_START,
    SAVE_ARTICLE_TO_DRAFTS_START
} from "@redux/actions";
import { ADMIN_ARTICLE_URL } from "@common/api";

export default connect(
    (state: any) => ({
        saved: state.adminArticle.saved
    }),
    dispatch => ({
        saveArticle(body) {
            dispatch({
                ...EDIT_ARTICLE_START,
                body
            });
        },
        saveToDrafts(body) {
            dispatch({
                ...SAVE_ARTICLE_TO_DRAFTS_START,
                body,
                isDraft: true
            });
        },
        changeSaved(saved) {
            let action = saved ? CHANGE_ARTICLE_SAVED : CHANGE_ARTICLE_NOT_SAVED;
            dispatch({
                ...action
            });
        },
        fetchArticleById(body: any,success: Function, error: Function) {
            dispatch({
                ...FETCH_ARTICLE_BY_ID_START,
                body,
                success,
                error,
                url: ADMIN_ARTICLE_URL
            });
        }
    })
)(ArticleEdit);