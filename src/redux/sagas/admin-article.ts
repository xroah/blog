import {
    takeLatest,
    put,
    call
} from "redux-saga/effects";
import { 
    ADMIN_ARTICLE_URL,
    SAVE_TO_DRAFTS
 } from "@common/api";
import _fetch from "@common/fetch";
import {
    FETCH_ARTICLES,
    FETCH_ARTICLES_START,
    DELETE_ARTICLE_START,
    EDIT_ARTICLE_START,
    CHANGE_ARTICLE_SAVED,
    FETCH_ARTICLE_STARTED,
    SAVE_ARTICLE_TO_DRAFTS_START,
    FETCH_DRAFTS,
    FETCH_DRAFTS_START
} from "@redux/actions";
import { push } from "connected-react-router";
import message from "@common/message";
import { loading } from "@common/loading";

function* fetchArticles(action: any) {
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

function* fetchDrafts() {
    loading.show();
    yield put({
        ...FETCH_ARTICLE_STARTED,
        started: true
    });
    try {
        let list = yield call(_fetch, SAVE_TO_DRAFTS);
        yield put({
            ...FETCH_DRAFTS,
            list
        });
    } catch (error) {
        
    }
    yield put({
        ...FETCH_ARTICLE_STARTED,
        started: false
    });
    loading.hide();
}

function* delArticle(action: any) {
    try {
        yield call(_fetch, ADMIN_ARTICLE_URL, {
            method: "DELETE",
            body: {
                id: action.id
            }
        });
        message.success("删除成功!");
        if (action.isDraft) {
            yield fetchDrafts();
        } else {
            yield fetchArticles({ page: 1 });
        }
    } catch (error) {

    }
}

function* editArticle(action: any) {
    let { body, isDraft } = action;
    let method = "post";
    if (body.id) {
        method = "put";
    }
    loading.show();
    try {
        yield call(_fetch, isDraft ? SAVE_TO_DRAFTS : ADMIN_ARTICLE_URL, {
            method,
            body
        });
        yield put(CHANGE_ARTICLE_SAVED);
        if (isDraft) {
            yield put(push("/xsys/articles/drafts"));
        } else {
            yield put(push("/xsys/articles"));
        }
        yield fetchArticles({ page: 1 });
        message.success("保存成功!");
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

function* watchFetchDrafts() {
    yield takeLatest(FETCH_DRAFTS_START.type, fetchDrafts);
}

function* watchEditArticle() {
    yield takeLatest(EDIT_ARTICLE_START.type, editArticle);
}

function* watchSaveToDrafts() {
    yield takeLatest(SAVE_ARTICLE_TO_DRAFTS_START.type, editArticle);
}

export default [
    watchFetchArticles(),
    watchFetchDrafts(),
    watchDelArticle(),
    watchEditArticle(),
    watchSaveToDrafts()
]