import React from "react";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Home from "./home";
import Category from "./category";
import Page404 from "./404";

export default () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/category" exact component={Category} />
            <Route path="/404" exact component={Page404} />
            <Redirect to="/404" />
        </Switch>
    );
}