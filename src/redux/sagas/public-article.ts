import {
    put,
    call,
    takeLatest
} from "redux-saga/effects";
import { FETCH_PUBLIC_ARTICLE } from "@common/api";
import {
    FETCH_PUBLIC_ARTICLES,
    FETCH_PUBLIC_ARTICLES_START,
    FETCH_ARTICLE_STARTED
} from "@redux/actions";
import _fetch from "@common/fetch";

function* fetchArticle() {
    yield put({
        ...FETCH_ARTICLE_STARTED,
        started: true
    });
    try {
        let ret = yield call(_fetch, FETCH_PUBLIC_ARTICLE);
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