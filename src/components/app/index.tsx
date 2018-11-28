import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../home";
import User from "../user";

export default class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/user" component={User} />
                </Switch>
            </Router>
        );
    }

}