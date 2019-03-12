import * as React from "react";
import NavBar from "@containers/nav-bar";
import { Route, Switch, Redirect } from "react-router-dom";
import Classification from "../classification";
import Articles from "../../../containers/admin-article";
import PhotoAlbum from "../photo-album";
import ModifyPwd from "@containers/modify-pwd";
import "./index.scss";

export default class AdminHome extends React.Component {

    render() {
        return (
            <>
                <NavBar/>
                <section className="main-container">
                    <Switch>
                        <Route path="/xsys" exact component={Articles}/>
                        <Route path="/xsys/cls" exact component={Classification}/>
                        <Route path="/xsys/photo-album" exact component={PhotoAlbum}/>
                        <Redirect to="/404"/>
                    </Switch>
                    <ModifyPwd/>
                </section>
            </>
        );
    }
} 