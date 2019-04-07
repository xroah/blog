import {
    call,
    put,
    takeLatest
} from "redux-saga/effects";
import _fetch from "@common/fetch";
import { ADMIN_IMAGE_URL } from "@common/api";
import {
    FETCH_IMAGES,
    FETCH_IMAGES_START,
    FETCH_IMAGES_STARTED
} from "@redux/actions";

function* fetchImages(action: any) {
    let { url, id } = action;
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
    } catch (error) {

    }
    yield put({
        ...FETCH_IMAGES_STARTED,
        started: false
    });
}

function* watchFetchImages() {
    yield takeLatest(FETCH_IMAGES_START.type, fetchImages);
}

export default [
    watchFetchImages()
];