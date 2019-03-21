import {
    put,
    call,
    takeLatest
} from "redux-saga/effects";
import {
    FETCH_ARTICLE_COMMENTS,
    FETCH_ARTICLE_COMMENTS_START,
    SAVE_ARTICLE_COMMENTS_START
} from "../actions";
import { FETCH_COMMENT } from "@common/api";
import _fetch from "@common/fetch";
import { isFunc } from "@common/util";

function* fetchComments(action) {
    try {
        let comments = yield call(_fetch, `${FETCH_COMMENT}?articleId=${action.articleId}`);
        yield put({
            ...FETCH_ARTICLE_COMMENTS,
            comments
        });
    } catch (error) {

    }
}

function* saveComment(action) {
    let { 
        body,
        success,
        error
     } = action;

    try {
        yield call(_fetch, FETCH_COMMENT, {
            method: "post",
            body
        });
        yield fetchComments({
            articleId: body.articleId
        });
        if (isFunc(success)) {
            success();
        }
    } catch (err) {
        if (isFunc(error)) {
            error();
        }
    }
}

function* watchFetchComments() {
    yield takeLatest(FETCH_ARTICLE_COMMENTS_START.type, fetchComments);
}

function* watchSaveComment() {
    yield takeLatest(SAVE_ARTICLE_COMMENTS_START.type, saveComment);
}

export default [
    watchFetchComments(),
    watchSaveComment()
];