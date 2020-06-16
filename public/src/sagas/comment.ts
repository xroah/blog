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
    WATCH_FETCH_COMMENT_LIST
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

function* watchFetchComment() {
    yield takeLatest(WATCH_FETCH_COMMENT_LIST, fetchComments);
}

export default [watchFetchComment()];