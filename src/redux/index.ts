import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import reducers from "./reducers";

let middleware = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);
if (process.env.NODE_ENV === "development") {
    const { logger } = require("redux-logger");
    middleware.push(logger);
}
const store = createStore(reducers, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);

export default store;