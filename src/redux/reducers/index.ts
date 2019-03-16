import { combineReducers } from "redux";
import article from "./article";
import modifyPwd from "./modify-pwd";
import cls from "./classification";

export default combineReducers({
    article,
    modifyPwd,
    cls
});