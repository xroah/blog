import adminArticle from "./admin-article";
import commonArticle from "./common-article";
import clsSaga from "./classification";
import comment from "./comment";
import publicArticle from "./public-article";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
        ...adminArticle,
        ...commonArticle,
        ...clsSaga,
        ...comment,
        ...publicArticle
    ]);
}