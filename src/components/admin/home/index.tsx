import * as React from "react";
import Editor from "../editor";

export default class AdminHome extends React.Component {

    render() {
        return (
            <div className="main-container">
                Admin home page
                <Editor/>
            </div>
        );
    }
} 