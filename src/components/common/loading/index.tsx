import * as React from "react";
import { 
    render,
    unmountComponentAtNode
 } from "react-dom";
import "./index.scss";

export default function Loading () {
    return (
        <div className="loading-wrapper">
           <div className="loading-rotate"></div> 
        </div>
    );
}

let div = document.createElement("div");

const loading = {
    show() {
        if (!div.parentNode) {
            document.body.appendChild(div);
        }
        render(<Loading/>, div);
    },
    hide() {
        unmountComponentAtNode(div);
    }
};

export {
    loading
}