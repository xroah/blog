import { connect } from "react-redux";
import Articles from "@components/visitor/articles";
import {
    FETCH_PUBLIC_ARTICLES_START,
    UPDATE_PUBLIC_ARTICLE_PAGE,
    EMPTY_PUBLIC_ARTICLES
} from "@redux/actions";

export default connect(
    (state: any) => ({
        list: state.publicArticle.list,
        page: state.publicArticle.page,
        started: state.commonArticle.started,
        hasMore: state.publicArticle.hasMore
    }),
    dispatch => ({
        fetchArticle(page: number = 1, callback?: Function) {
            dispatch({
                ...FETCH_PUBLIC_ARTICLES_START,
                page,
                callback
            });
        },
        updatePage(page: number) {
            dispatch({
                ...UPDATE_PUBLIC_ARTICLE_PAGE,
                page
            });
        },
        emptyArticle() {
            dispatch({
                ...EMPTY_PUBLIC_ARTICLES
            });
        }
    })
)(Articles);