import * as React from "react";
import NavBar from "@components/admin/nav-bar";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Classification from "../classification";
import Articles from "../articles";
import PhotoAlbum from "@containers/common/photo-album";
import ModifyPwd from "@containers/admin/modify-pwd";
import ArticleEdit from "@containers/admin/article-edit";
import HomePage from "../homepage";
import ViewArticle from "@containers/common/view-article";
import CommentsManagement from "../comment-management";
import AlbumImages from "@containers/common/album-image";
import UploadImage from "@containers/admin/upload-dialog";
import Version from "../version";
import About from "@common/about";
import {
    ADMIN_ARTICLE_URL,
    ADMIN_ALBUM_URL,
    ADMIN_IMAGE_URL
} from "@common/api";
import "./index.scss";


function _ViewArticle() {
    return <ViewArticle fetchUrl={ADMIN_ARTICLE_URL} />;
}

function _PhotoAlbum() {
    return <PhotoAlbum
        url={ADMIN_ALBUM_URL}
        isAdmin={true} />;
}

function _AlbumImages() {
    return <AlbumImages isAdmin={true} url={ADMIN_IMAGE_URL} />
}

export default class AdminHome extends React.Component {

    render() {
        return (
            <>
                <NavBar />
                <section className="main-container">
                    <Switch>
                        <Route path="/xsys" exact component={HomePage} />
                        <Route path="/xsys/cls" exact component={Classification} />
                        <Route path="/xsys/comments/:page?" component={CommentsManagement} />
                        <Route path="/xsys/photo-album" exact component={_PhotoAlbum} />
                        <Route path="/xsys/photo-album/:id" exact component={_AlbumImages} />
                        <Route path="/xsys/article/edit" exact component={ArticleEdit} />
                        <Route path="/xsys/articles" component={Articles} />
                        <Route path="/xsys/article/:id" exact component={_ViewArticle} />
                        <Route path="/xsys/version" exact component={Version} />
                        <Route path="/xsys/about" exact component={About} />
                        <Redirect to="/404" />
                    </Switch>
                    <ModifyPwd />
                    <UploadImage />
                </section>
            </>
        );
    }
} 