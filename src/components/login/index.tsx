import * as React from "react";
import Login from "./login";
import Register from "./register";
import { Route, Switch } from "react-router-dom";

interface Props {
    history: any;
}

export default class User extends React.Component<Props> {

    login = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                111111
                <Switch>
                    <Route path="/user/login" exact component={Login}></Route>
                    <Route path="/user/register" exact component={Register}></Route>
                </Switch>
            </div>
        );
    }
}