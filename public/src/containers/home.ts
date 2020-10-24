import {connect} from "react-redux";
import {
    emptyArticle,
    updatePullRefreshState,
    WATCH_FETCH_ARTICLE
} from "../actions";
import HomePage from "../components/home";

export default connect(
    (state: any) => ({
        page: state.article.page,
        error: state.article.error,
        list: state.article.list,
        totalPages: state.article.totalPages,
        loading: state.article.loading,
        pullRefreshState: state.article.pullRefreshState
    }),
    dispatch => ({
        fetchArticles(
            page: number,
            category: string,
            onSuccess?: () => void,
            onError?: () => void
        ) {
            dispatch({
                type: WATCH_FETCH_ARTICLE,
                payload: {
                    page,
                    category,
                    onSuccess,
                    onError
                }
            })
        },
        emptyArticle() {
            dispatch(emptyArticle())
        },
        updatePullFreshState(state: string) {
            dispatch(updatePullRefreshState(state))
        }
    })
)(HomePage as any);