import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import adminArticle from "./admin-article";
import commonArticle from "./common-article";
import modifyPwd from "./modify-pwd";
import cls from "./classification";
import comment from "./comment";
import publicArticle from "./public-article";
import photoAlbum from "./photo-album";

export default history => combineReducers({
    router: connectRouter(history),
    adminArticle,
    commonArticle,
    modifyPwd,
    cls,
    comment,
    publicArticle,
    photoAlbum
});