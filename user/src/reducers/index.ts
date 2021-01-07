import { combineReducers } from "redux";
import article from "./article";
import view from "./view";
import comment from "./comment";
import rightBottom from "./right-bottom";

export default combineReducers({
    article,
    view,
    comment,
    rightBottom
});