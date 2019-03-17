import {
    takeLatest,
    put,
    call
} from "redux-saga/effects";
import { ADMIN_ARTICLE_URL } from "@common/api";
import _fetch from "@common/fetch";
import {
    FETCH_ARTICLES,
    FETCH_ARTICLES_START,
    DELETE_ARTICLE_START
} from "@redux/actions";
import message from "@common/message";

function* fetchArticles() {
    try {
        let articles = yield call(_fetch, ADMIN_ARTICLE_URL);
        yield put({
            ...FETCH_ARTICLES,
            ...articles
        });
    } catch (error) {

    }
}

function* delArticle(action) {
    try {
        yield call(_fetch, ADMIN_ARTICLE_URL, {
            method: "DELETE",
            body: {
                id: action.id
            }
        });
        message.success("删除成功!");
        yield fetchArticles();
    } catch (error) {

    }
}

function* watchDelArticle() {
    yield takeLatest(DELETE_ARTICLE_START.type, delArticle);
}

function* watchFetchArticles() {
    yield takeLatest(FETCH_ARTICLES_START.type, fetchArticles);
}

export default [
    watchFetchArticles(),
    watchDelArticle()
]