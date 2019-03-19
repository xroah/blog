import Articles from "@components/admin/articles";
import { 
    FETCH_ARTICLES_START,
    ADMIN_UPDATE_ARTICLE_PAGE,
    EMPTY_ARTICLE
 } from "@redux/actions";
import { connect } from "react-redux";

export default connect(
    (state: any) => ({
        page: state.article.page,
        list: state.article.list,
        total: state.article.total
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
                ...EMPTY_ARTICLE
            });
        }
    })
)(Articles);