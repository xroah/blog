import {
    call,
    put,
    takeLatest
} from "redux-saga/effects";
import _fetch from "@common/fetch";
import {
    FETCH_IMAGES,
    FETCH_IMAGES_START,
    FETCH_IMAGES_STARTED,
    DELETE_IMAGE_START,
    UPDATE_IMAGE_NAME_START,
    FETCH_ALBUM_BY_ID,
    FETCH_ALBUM_BY_ID_START,
    DELETE_IMAGE_BY_ID,
    FETCH_ALBUMS_START,
    SET_COVER_START,
    UPDATE_CUR_ALBUM_COVER,
    UPDATE_IMAGE_NAME_BY_ID
} from "@redux/actions";
import message from "@common/message";
import {
    SET_ALBUM_COVER,
    ADMIN_IMAGE_URL
} from "@common/api";
import { isFunc } from "@common/util";

function* fetchImages(action: any) {
    let {
        url,
        id,
        callback
    } = action;
    yield put({
        ...FETCH_IMAGES_STARTED,
        started: true
    });
    try {
        let images = yield call(_fetch, `${url}?albumId=${id}`);
        yield put({
            ...FETCH_IMAGES,
            images
        });
        if (typeof callback === "function") {
            callback(images);
        }
    } catch (error) {

    }
    yield put({
        ...FETCH_IMAGES_STARTED,
        started: false
    });
}

function* fetchAlbum(action: any) {
    let { id, url } = action;
    yield put({
        ...FETCH_ALBUM_BY_ID,
        album: null
    });
    try {
        let album = yield call(_fetch, `${url}?id=${id}`);
        yield put({
            ...FETCH_ALBUM_BY_ID,
            album
        });
    } catch (err) {

    }
}

function* deleteImage(action: any) {
    let {
        id,
        success 
    } = action;
    try {
        yield call(_fetch, ADMIN_IMAGE_URL, {
            method: "delete",
            body: {
                id
            }
        });
        message.success("删除成功!");
        if (isFunc(success)) {
            success();
        }
        yield put({
            ...DELETE_IMAGE_BY_ID,
            id
        });
        yield put({
            ...FETCH_ALBUMS_START
        });
    } catch (error) {

    }
}

function* setCover(action: any) {
    let { body } = action;
    message.success("设置成功!");
    try {
        yield call(_fetch, SET_ALBUM_COVER, {
            method: "post",
            body
        });
        yield put({
            ...UPDATE_CUR_ALBUM_COVER,
            id: body.imageId
        });
        yield put({
            ...FETCH_ALBUMS_START
        });
    } catch (error) {

    }
}

function* updateName(action: any) {
    let {
        body,
        callback
    } = action;
    try {
        yield call(_fetch, ADMIN_IMAGE_URL, {
            method: "put",
            body
        });
        yield put({
            ...UPDATE_IMAGE_NAME_BY_ID,
            ...body
        });
        if (typeof callback === "function") callback();
        message.success("修改成功!");
    } catch (error) {

    }
}

function* watchFetchImages() {
    yield takeLatest(FETCH_IMAGES_START.type, fetchImages);
}

function* watchFetchAlbum() {
    yield takeLatest(FETCH_ALBUM_BY_ID_START.type, fetchAlbum);
}

function* watchDeleteById() {
    yield takeLatest(DELETE_IMAGE_START.type, deleteImage);
}

function* watchSetCover() {
    yield takeLatest(SET_COVER_START.type, setCover);
}

function* watchUpdateName() {
    yield takeLatest(UPDATE_IMAGE_NAME_START.type, updateName);
}

export default [
    watchFetchImages(),
    watchFetchAlbum(),
    watchDeleteById(),
    watchSetCover(),
    watchUpdateName()
];