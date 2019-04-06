import * as React from "react";
import {
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import NavBar from "../nav-bar";
import Homepage from "../homepage";
import PhotoAlbum from "@containers/common/photo-album";
import ViewArticle from "@containers/common/view-article";
import { 
    FETCH_PUBLIC_ARTICLE,
    PUBLIC_ALBUM_URL
} from "@common/api";

function _ViewArticle() {
    return <ViewArticle fetchUrl={FETCH_PUBLIC_ARTICLE} updateViewedTime={true} />;
}

function _PhotoAlbum() {
    return <PhotoAlbum url={PUBLIC_ALBUM_URL}/>;
}

export default class UserHome extends React.Component {

    render() {
        return (
            <section className="main-container responsive">
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/photo-album" component={_PhotoAlbum} />
                    <Route exact path="/articles/:id" component={_ViewArticle}/>
                    <Redirect to="/404" />
                </Switch>
            </section>
        );
    }
}