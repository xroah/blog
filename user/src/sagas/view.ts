import {
    call,
    takeLatest,
    put
} from "redux-saga/effects";
import xhr from "../utils/xhr";
import { ARTICLE_LIST, PREV_AND_NEXT } from "../components/api";
import {
    updateArticle,
    WATCH_FETCH_ARTICLE_BY_ID,
    updatePrevNext,
    WATCH_FETCH_PREV_AND_NEXT
} from "../actions";

function* fetchArticle(action: any) {
    const { articleId } = action;

    try {
        const data = yield call(xhr, ARTICLE_LIST, {
            data: {
                articleId
            }
        });
        
        yield put(updateArticle(data));
    } catch (error) {
        yield put(updateArticle(-1));
    }
}

function* watchFetchArticle() {
    yield takeLatest(WATCH_FETCH_ARTICLE_BY_ID, fetchArticle);
}

function* fetchPrevNext(action: any) {
    const { articleId } = action;

    yield put(updatePrevNext({}));

    try {
        const data = yield call(xhr, PREV_AND_NEXT, {
            data: {
                articleId
            }
        });
        
        yield put(updatePrevNext({
            ...data
        }));
    } catch (error) {
        
    }
}

function* watchFetchPrevNext() {
    yield takeLatest(WATCH_FETCH_PREV_AND_NEXT, fetchPrevNext);
}

export default [
    watchFetchArticle(),
    watchFetchPrevNext()
];