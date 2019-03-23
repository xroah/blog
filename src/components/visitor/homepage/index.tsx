import * as React from "react";
import Articles from "@containers/visitor/public-article";
import RightInfo from "../right-info";
import "./index.scss";

export default class Homepage extends React.Component {
    render() {
        return (
            <div className="article-container">
                <Articles />
                <RightInfo />
            </div>
        );
    }
}