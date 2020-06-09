import React from "react";
import { render, hydrate } from "react-dom";
import App from "./components/app";
import "./index.scss";

const root = document.getElementById("root");

if (process.env.NODE_ENV === "development") {
    render(
        <App />,
        root
    )
}