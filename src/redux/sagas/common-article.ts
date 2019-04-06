import {
    takeLatest,
    put,
    call
} from "redux-saga/effects";
import _fetch from "@common/fetch";
import { FETCH_PUBLIC_ARTICLE } from "@common/api";
import {
    FETCH_ARTICLE_BY_ID,
    FETCH_ARTICLE_BY_ID_START,
    FETCH_ARTICLE_STARTED
} from "@redux/actions";
import { loading } from "@common/loading";

function* fetchArticleById(action) {
    loading.show();
    yield put({
        ...FETCH_ARTICLE_STARTED,
        started: true
    });
    yield put({
        ...FETCH_ARTICLE_BY_ID,
        article: null
    });
    let {
        id,
        url = FETCH_PUBLIC_ARTICLE
    } = action;
    try {
        let ret = yield call(_fetch, `${url}?id=${id}`);
        yield put({
            ...FETCH_ARTICLE_BY_ID,
            article: ret
        });
        if (typeof action.success === "function") action.success(ret);
    } catch (error) {
        if (typeof action.error === "function") action.error();
    }
    yield put({
        ...FETCH_ARTICLE_STARTED,
        started: false
    });
    loading.hide();
}

function* watchFetchArticleById() {
    yield takeLatest(FETCH_ARTICLE_BY_ID_START.type, fetchArticleById);
}

export default [
    watchFetchArticleById()
]