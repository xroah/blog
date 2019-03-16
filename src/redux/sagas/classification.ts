import {
    FETCH_CLS,
    FETCH_CLS_START,
    DELETE_CLS,
    DELETE_CLS_START,
    EDIT_CLS,
    EDIT_CLS_START
} from "../actions";
import {
    takeLatest,
    put,
    call
} from "redux-saga/effects";
import _fetch from "@common/fetch";
import {
    FETCH_CLS_URL
} from "@common/api"

function* deleteCls(action) {
    console.log("sagas=================>", action)
}

function* fetchCls() {
    try {
        let list = yield call(_fetch, FETCH_CLS_URL);
        yield put({
            ...FETCH_CLS,
            list
        });
    } catch (error) {

    }
}

function* watchFetchCls() {
    yield takeLatest(FETCH_CLS_START.type, fetchCls);
}

function* watchDeleteCls() {
    yield takeLatest(DELETE_CLS_START.type, deleteCls);
}

export default [
    watchDeleteCls(),
    watchFetchCls()
];