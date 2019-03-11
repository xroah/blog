import articleSaga from "./article";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
        ...articleSaga
    ]);
}