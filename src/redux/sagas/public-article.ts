import {
    put,
    call,
    takeLatest
} from "redux-saga/effects";
import { FETCH_PUBLIC_ARTICLE } from "@common/api";
import {
    FETCH_PUBLIC_ARTICLES,
    FETCH_PUBLIC_ARTICLES_START,
    FETCH_ARTICLE_STARTED,
    UPDATE_NO_MORE_ARTICLE
} from "@redux/actions";
import _fetch from "@common/fetch";

function* fetchArticle(action) {
    yield put({
        ...FETCH_ARTICLE_STARTED,
        started: true
    });
    try {
        let ret = yield call(_fetch, `${FETCH_PUBLIC_ARTICLE}?page=${action.page}`);
        if (ret.list.length < 10) {
            yield put({
                ...UPDATE_NO_MORE_ARTICLE,
                hasMore: false
            });
        }
        yield put({
            ...FETCH_PUBLIC_ARTICLES,
            articles: ret.list
        });
    } catch (error) {

    }
    yield put({
        ...FETCH_ARTICLE_STARTED,
        started: false
    });
}

function* watchFetchArticle() {
    yield takeLatest(FETCH_PUBLIC_ARTICLES_START.type, fetchArticle);
}

export default [
    watchFetchArticle()
];