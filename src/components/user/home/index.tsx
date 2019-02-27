import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Articles from "../articles";

export default class UserHome extends React.Component {
    render() {
        return (
            <div>
                <nav>导航</nav>
                <Switch>
                    <Route exact path="/" component={Articles}/>
                    <Redirect to="/404"/>
                </Switch>
                User Home page
            </div>
        );
    }
}