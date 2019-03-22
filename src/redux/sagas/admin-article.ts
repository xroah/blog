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
    DELETE_ARTICLE_START,
    EDIT_ARTICLE_START,
    CHANGE_ARTICLE_SAVED,
    FETCH_ARTICLE_STARTED
} from "@redux/actions";
import { push } from "connected-react-router";
import message from "@common/message";
import { loading } from "@common/loading";

function* fetchArticles(action) {
    loading.show();
    yield put({
        ...FETCH_ARTICLE_STARTED,
        started: true
    });
    try {
        let articles = yield call(_fetch, `${ADMIN_ARTICLE_URL}?page=${action.page}`);
        yield put({
            ...FETCH_ARTICLES,
            ...articles
        });
    } catch (error) {
    }
    yield put({
        ...FETCH_ARTICLE_STARTED,
        started: false
    });
    loading.hide();
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
        yield fetchArticles({ page: 1 });
    } catch (error) {

    }
}

function* editArticle(action) {
    let { body } = action;
    let method = "post";
    if (body.id) {
        method = "put";
    }
    loading.show();
    try {
        yield call(_fetch, ADMIN_ARTICLE_URL, {
            method,
            body
        });
        yield put(CHANGE_ARTICLE_SAVED);
        yield put(push("/xsys/articles"));
    } catch (error) {

    }
    loading.hide();
}

function* watchDelArticle() {
    yield takeLatest(DELETE_ARTICLE_START.type, delArticle);
}

function* watchFetchArticles() {
    yield takeLatest(FETCH_ARTICLES_START.type, fetchArticles);
}

function* watchEditArticle() {
    yield takeLatest(EDIT_ARTICLE_START.type, editArticle);
}

export default [
    watchFetchArticles(),
    watchDelArticle(),
    watchEditArticle()
]