import * as React from "react";
import {
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import NavBar from "../nav-bar";
import Articles from "../articles";
import PhotoAlbum from "@common/photo-album";

export default class UserHome extends React.Component {

    render() {
        return (
            <section className="main-container">
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Articles} />
                    <Route exact path="/photo-album" component={PhotoAlbum} />
                    <Redirect to="/404" />
                </Switch>
            </section>
        );
    }
}