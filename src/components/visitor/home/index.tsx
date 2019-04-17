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
import AlbumImages from "@containers/common/album-image";
import About from "@common/about";
import {
    FETCH_PUBLIC_ARTICLE,
    PUBLIC_ALBUM_URL,
    PUBLIC_IMAGE_URL
} from "@common/api";

function _ViewArticle() {
    return <ViewArticle fetchUrl={FETCH_PUBLIC_ARTICLE} updateViewedTime={true} />;
}

function _PhotoAlbum() {
    return <PhotoAlbum url={PUBLIC_ALBUM_URL} />;
}

function _AlbumImages() {
    return <AlbumImages url={PUBLIC_IMAGE_URL} />
}

export default class UserHome extends React.Component {

    render() {
        return (
            <section className="main-container responsive">
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/photo-album" component={_PhotoAlbum} />
                    <Route exact path="/photo-album/:id" component={_AlbumImages} />
                    <Route exact path="/articles/:id" component={_ViewArticle} />
                    <Route exact path="/about" component={About}/>
                    <Redirect to="/404" />
                </Switch>
            </section>
        );
    }
}