import * as React from "react";
import NavBar from "../nav-bar";
import { Route, Switch, Redirect } from "react-router-dom";
import Classification from "../classification";
import Articles from "../articles";
import PhotoAlbum from "../photo-album";
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
                </section>
            </>
        );
    }
} 