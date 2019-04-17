import * as React from "react";
import UpdateLog from "../update-log";
import "./index.scss";

export default class About extends React.Component {

    state = {
        list: []
    };

    componentDidMount() {
        document.title = "关于";
    }

    render() {
        return (
            <div>
                关于
                <UpdateLog />
            </div>
        );
    }
}