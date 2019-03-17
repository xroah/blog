import {
    FETCH_CLS,
    FETCH_CLS_START,
    DELETE_CLS_START,
    EDIT_CLS_START,
    HIDE_CLS_DIALOG
} from "../actions";
import {
    takeLatest,
    put,
    call
} from "redux-saga/effects";
import _fetch from "@common/fetch";
import { ADMIN_CLS_URL } from "@common/api"
import message from "@common/message";

function* deleteCls(action) {
    try {
        yield call(_fetch, ADMIN_CLS_URL, {
            method: "delete",
            body: {
                id: action.id
            }
        });
        message.success("删除成功!");
        yield fetchCls();
    } catch (error) {

    }
}

function* editCls(action) {
    var body: any = {
        name: action.name
    };
    let method = "post";
    if (action.id) {
        body.id = action.id;
        method = "put";
    }
    try {
        yield call(_fetch, ADMIN_CLS_URL, {
            method,
            body
        });
        message.success("保存成功!");
        yield put({ ...HIDE_CLS_DIALOG });
        yield fetchCls();
    } catch (error) {

    }
}

function* fetchCls() {
    try {
        let list = yield call(_fetch, ADMIN_CLS_URL);
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

function* watchEditCls() {
    yield takeLatest(EDIT_CLS_START.type, editCls);
}

function* watchDeleteCls() {
    yield takeLatest(DELETE_CLS_START.type, deleteCls);
}

export default [
    watchDeleteCls(),
    watchFetchCls(),
    watchEditCls()
];