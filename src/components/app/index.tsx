import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../home";
import Login from "../login";

export default class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/user" component={Login} />
                </Switch>
            </Router>
        );
    }

}