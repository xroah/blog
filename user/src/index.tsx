import React from "react";
import { render, hydrate } from "react-dom";
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import {loadableReady} from "@loadable/component";
import "./styles/index.scss"

//server side state
const initialStateScript = document.getElementById("reduxInitialState") as HTMLScriptElement;
let initialState;

if (initialStateScript) {
    try {
        initialState = JSON.parse(initialStateScript.text.trim());
    } catch (error) {
        initialState = {};
    }
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducers,
    initialState,
    applyMiddleware(sagaMiddleware)
);

const root = document.getElementById("root");
const _App = (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

sagaMiddleware.run(rootSaga);

if (process.env.NODE_ENV === "development") {
    render(
        _App,
        root
    );
} else {
    loadableReady(() => hydrate(_App, root));
}