import * as React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import Aside from "./aside";
import Published from "@containers/admin/admin-article";
import Draft from "@containers/admin/drafts";
import "./index.scss";

export default class Articles extends React.Component {
    render() {
        return (
            <div className="articles-container">
                <Aside />
                <Switch>
                    <Route path="/xsys/articles" component={Published} exact />
                    <Route path="/xsys/articles/drafts" component={Draft} exact />
                </Switch>
            </div>
        );
    }
}