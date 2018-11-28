import * as React from "react";
import { render } from "react-dom";
import App from "./components/app";
import { hot } from "react-hot-loader";

import "normalize.css";
import "./styles/global.scss";
import "./styles/transitions.scss";

const APP = hot(module)(App);

render(
    <APP />,
    document.getElementById("app")
);