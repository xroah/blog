import * as React from "react";
import { render } from "react-dom";
import App from "./components/nav";
import { hot } from "react-hot-loader";
import "normalize.css";

const APP = hot(module)(App);

render(
    <APP />,
    document.getElementById("app")
);