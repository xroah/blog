import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import createRootReducer from "./reducers";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import getUserConfirmation from "@common/user-confirmation";

export const history = createBrowserHistory({
    getUserConfirmation
});

const sagaMiddleware = createSagaMiddleware();

let middleware = [routerMiddleware(history), sagaMiddleware];

if (process.env.NODE_ENV === "development") {
    const { logger } = require("redux-logger");
    middleware.push(logger);
}
const store = createStore(createRootReducer(history), applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);

export default store;