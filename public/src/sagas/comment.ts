import {
    call,
    put,
    takeLatest
} from "redux-saga/effects";
import {
    updateCommentLoading,
    updateCommentError,
    updateCommentList,
    concatCommentList,
    WATCH_FETCH_COMMENT_LIST,
    PUBLISH_COMMENT,
    updatePublishStatus,
    insertComment
} from "../actions";
import xhr from "../utils/xhr";
import { COMMENT } from "../components/api";

function* fetchComments(action: any) {
    const {
        articleId,
        refresh
    } = action.payload;

    yield put(updateCommentLoading(true));
    yield put(updateCommentError(false));

    if (refresh) {
        yield put(updateCommentList([]));
    }

    try {
        const data = yield call(xhr, COMMENT, {
            data: {
                articleId
            }
        });

        if (refresh) {
            yield put(updateCommentList(data));
        } else {
            yield put(concatCommentList(data));
        }
    } catch (error) {
        yield put(updateCommentError(true));
    } finally {
        yield put(updateCommentLoading(false));
    }
}

function* publishComment(action: any) {
    const {
        data,
        onSuccess,
        onFail
    } = action.payload;

    yield put(updatePublishStatus(true));

    try {
        const ret = yield call(xhr, COMMENT, {
            data,
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });

        yield put(insertComment(ret));
        onSuccess();
    } catch (error) {
        onFail(error);
    } finally {
        yield put(updatePublishStatus(false));
    }
}

function* watchFetchComment() {
    yield takeLatest(WATCH_FETCH_COMMENT_LIST, fetchComments);
}

function* watchPublishComment() {
    yield takeLatest(PUBLISH_COMMENT, publishComment);
}

export default [
    watchFetchComment(),
    watchPublishComment()
];