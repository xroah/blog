import { connect } from "react-redux";
import { WATCH_FETCH_ARTICLE } from "../actions";
import HomePage from "../components/home";

export default connect(
    (state: any) => ({
        page: state.article.page,
        error: state.article.error,
        list: state.article.list,
        totalPages: state.article.totalPages,
        loading: state.article.loading
    }),
    dispatch => ({
        fetchArticles(
            page: number,
            category: string,
            onSuccess?: () => void) {
            dispatch({
                type: WATCH_FETCH_ARTICLE,
                payload: {
                    page,
                    category,
                    onSuccess
                }
            })
        }
    })
)(HomePage as any);