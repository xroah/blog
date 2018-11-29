import * as React from "react";
import Login from "./login";
import Register from "./register";
import GetPass from "./getPass"
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./index.scss";

interface Props {
    history: any;
    location: any;
}

export default class User extends React.Component<Props, any> {

    login = () => {
        this.props.history.push("/");
    }

    render() {
        let { location } = this.props;

        return (
            <>
                <div className="login-background"></div>
                <section className="user-container">
                    <TransitionGroup component={null}>
                        <CSSTransition key={location.pathname} classNames="flip" timeout={1000}>
                            <Switch location={location}>
                                <Route path="/user/login" exact component={Login}/>
                                <Route path="/user/register" exact component={Register}/>
                                <Route path="/user/getPass" exact component={GetPass}/>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </section>
            </>
        );
    }
}