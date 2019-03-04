import * as React from "react";
import NavBar from "../nav-bar";
import { Route, Switch, Redirect } from "react-router-dom";
import Classification from "../classification";
import Articles from "../articles";
import message from "@common/message";
import "./index.scss";

export default class AdminHome extends React.Component {

    success = () => {
        message.success("succes");
    }

    info = () => {
        message.info("info");
    }

    error = () => {
        message.error("error", 1500);
    }

    render() {
        return (
            <>
                <NavBar/>
                <section className="main-container">
                    <Switch>
                        <Route path="/xsys" exact component={Articles}/>
                        <Route path="/xsys/cls" exact component={Classification}/>
                        <Redirect to="/404"/>
                    </Switch>
                    <button onClick={this.success}>success</button>
                    <button onClick={this.info}>info</button>
                    <button onClick={this.error}>error</button>
                </section>
            </>
        );
    }
} 