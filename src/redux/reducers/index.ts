import { combineReducers } from "redux";
import article from "./article";
import modifyPwd from "./modify-pwd";

export default combineReducers({
    article,
    modifyPwd
});