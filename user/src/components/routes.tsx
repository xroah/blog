import React from "react";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
// import Category from "./category";
import About from "./about";
import Page404 from "./404";
import loadable from "@loadable/component";

const Home = loadable(() => import("../containers/home"));
const ViewArticle = loadable(() => import("../containers/view-articles"));

export default () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            {/* <Route path="/category" exact component={Category} /> */}
            <Route path="/about" exact component={About}/>
            <Route path="/view/:id" exact component={ViewArticle} />
            <Route path="/404" exact component={Page404} />
            <Redirect to="/404" />
        </Switch>
    );
}