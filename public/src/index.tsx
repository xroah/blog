import React from "react";
import { render, hydrate } from "react-dom";
import App from "./components/app";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");
const _App = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

if (process.env.NODE_ENV === "development") {
    render(
        _App,
        root
    )
} else {
    hydrate(
        _App,
        root
    )
}