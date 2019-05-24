import Articles from "@components/admin/articles/published";
import { 
    FETCH_ARTICLES_START,
    ADMIN_UPDATE_ARTICLE_PAGE,
    EMPTY_ADMIN_ARTICLES
 } from "@redux/actions";
import { connect } from "react-redux";

export default connect(
    (state: any) => ({
        page: state.adminArticle.page,
        list: state.adminArticle.list,
        total: state.adminArticle.total,
        started: state.commonArticle.started
    }),
    dispatch => ({
        fetchArticle(page: number = 1) {
            dispatch({
                ...FETCH_ARTICLES_START,
                page
            });
        },
        updatePage(page: number) {
            dispatch({
                ...ADMIN_UPDATE_ARTICLE_PAGE,
                page
            });
        },
        emptyArticle() {
            dispatch({
                ...EMPTY_ADMIN_ARTICLES
            });
        }
    })
)(Articles);