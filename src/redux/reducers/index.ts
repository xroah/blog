import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import article from "./article";
import modifyPwd from "./modify-pwd";
import cls from "./classification";
import comment from "./comment";

export default history => combineReducers({
    router: connectRouter(history),
    article,
    modifyPwd,
    cls,
    comment
});