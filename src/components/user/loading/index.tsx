import * as React from "react";
import "./index.scss";

export default class Loading extends React.Component {

    render() {
        return (
            <div className="bottom-loading-wrapper">
                <div className="bottom-loading" />
            </div>
        );
    }

}