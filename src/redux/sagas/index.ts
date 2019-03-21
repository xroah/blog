import articleSaga from "./article";
import clsSaga from "./classification";
import comment from "./comment";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
        ...articleSaga,
        ...clsSaga,
        ...comment
    ]);
}