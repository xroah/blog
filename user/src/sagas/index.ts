import { all } from "redux-saga/effects";
import article from "./article";
import view from "./view";
import comment from "./comment";

export default function* rootSaga()  {
    yield all([
        ...article,
        ...view,
        ...comment
    ]);
}