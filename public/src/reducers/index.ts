import { combineReducers } from "redux";
import article from "./article";
import view from "./view";
import comment from "./comment";

export default combineReducers({
    article,
    view,
    comment
});