import {
    FETCH_ALBUMS,
    ADD_ALBUM_START,
    FETCH_ALBUMS_START,
    DELETE_ALBUM_START
} from "../actions";
import {
    call,
    takeLatest,
    put
} from "redux-saga/effects";
import _fetch from "@common/fetch";
import { loading } from "@common/loading";
import { ADMIN_ALBUM_URL } from "@common/api";
import message from "@common/message";

function* fetchAlbum(action: any) {
    let { url = ADMIN_ALBUM_URL } = action
    loading.show();
    try {
        let list = yield call(_fetch, url);
        yield put({
            ...FETCH_ALBUMS,
            list
        });
    } catch (err) {
    }
    loading.hide();
}

function* saveAlbum(action: any) {
    let {
        body,
        success,
        error
    } = action;
    let method = "post";
    if (body.id) {
        method = "put";
    }
    loading.show();
    try {
        yield call(_fetch, ADMIN_ALBUM_URL, {
            method,
            body
        });
        message.success("保存成功!");
        yield fetchAlbum({
            url: ADMIN_ALBUM_URL
        });
        if (typeof success === "function") {
            success();
        }
    } catch (err) {
        if (typeof error === "function") {
            error();
        }
    }
    loading.hide();
}

function* delAlbum(action: any) {
    loading.show();
    try {
        yield call(_fetch, ADMIN_ALBUM_URL, {
            method: "delete",
            body: {
                id: action.id
            }
        });
        message.success("删除成功!");
        yield fetchAlbum({
            url: ADMIN_ALBUM_URL
        });
    } catch (error) {

    }
    loading.hide();
}

function* watchFetchAlbumAdmin() {
    yield takeLatest(FETCH_ALBUMS_START.type, fetchAlbum);
}

function* watchSaveAlbum() {
    yield takeLatest(ADD_ALBUM_START.type, saveAlbum);
}

function* watchDelAlbum() {
    yield takeLatest(DELETE_ALBUM_START.type, delAlbum);
}

export default [
    watchFetchAlbumAdmin(),
    watchSaveAlbum(),
    watchDelAlbum()
];