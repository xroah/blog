import {
    takeLatest,
    put,
    call
} from "redux-saga/effects";
import {
    updateArticles,
    WATCH_FETCH_ARTICLE,
    updateError,
    updatePage,
    updateLoading
} from "../actions";
import xhr from "../utils/xhr";
import { ARTICLE_LIST } from "../components/api";
import noop from "../utils/noop";

function* fetchArticles(action: any) {
    const {
        page,
        onSuccess = noop,
        onError = noop
    } = action.payload;

    yield put(updateLoading(true));

    try {
        const data = yield call(xhr, ARTICLE_LIST, {
            data: {
                page
            }
        });

        onSuccess()
        yield put((updatePage(page)));
        yield put(updateArticles(data));
        yield put(updateError(false));
    } catch (error) {
        onError()
        yield put(updateError(true));
    }

    yield put(updateLoading(false));
}

function* watchFetchArticles() {
    yield takeLatest(WATCH_FETCH_ARTICLE, fetchArticles);
}

export default [watchFetchArticles()];