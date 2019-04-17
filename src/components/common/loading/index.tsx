import * as React from "react";
import {
    render,
    unmountComponentAtNode
} from "react-dom";
import { CircularProgress } from "@material-ui/core";
import "./index.scss";

export default function Loading() {
    return (
        <div className="loading-wrapper">
            <CircularProgress className="loading-indicator"/>
        </div>
    );
}

let div = document.createElement("div");

const loading = {
    show() {
        if (!div.parentNode) {
            document.body.appendChild(div);
        }
        render(<Loading />, div);
    },
    hide() {
        unmountComponentAtNode(div);
    }
};

export {
    loading
}