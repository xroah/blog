import { all } from "redux-saga/effects";
import article from "./article";
import view from "./view";

export default function* rootSaga()  {
    yield all([
        ...article,
        ...view
    ]);
}