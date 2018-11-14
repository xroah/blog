import * as React from "react";
import Login from "./login";
import Register from "./register";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./index.scss";

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
                <TransitionGroup>
                    <CSSTransition classNames="fade" timeout={300}>
                        <Switch>
                            <Route path="/user/login" exact component={Login}></Route>
                            <Route path="/user/register" exact component={Register}></Route>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        );
    }
}