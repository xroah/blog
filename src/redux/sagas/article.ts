import {
    takeLatest,
    put,
    call
} from "redux-saga/effects";
import { FETCH_ARTICLES_URL } from "@common/api";
import _fetch from "@common/fetch";
import { FETCH_ARTICLES, FETCH_ARTICLES_START } from "@redux/actions";

function* fetchArticles() {
    try {
        let articles = yield call(_fetch, `${FETCH_ARTICLES_URL}`, {
            method: "get"
        });
        yield put({
            type: FETCH_ARTICLES.type,
            articles
        });
    } catch (error) {
        
    }
}

function* watchFetchArticles() {
    yield takeLatest(FETCH_ARTICLES_START.type, fetchArticles);
}

export default [
    watchFetchArticles()
]