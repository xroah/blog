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

function* fetchArticles(action: any) {
    const { page } = action.payload;
console.log(page)
    yield put(updateLoading(true));

    try {
        const data = yield call(xhr, ARTICLE_LIST, {
            data: {
                page
            }
        });
        yield put(updateArticles(data));
        yield put(updateError(false));
        yield put((updatePage(page)));
    } catch (error) {
        yield put(updateError(true));
    }

    yield put(updateLoading(false));
}

function* watchFetchArticles() {
    yield takeLatest(WATCH_FETCH_ARTICLE, fetchArticles);
}

export default [watchFetchArticles()];