import * as React from "react";
import NavBar from "@components/admin/nav-bar";
import { Route, Switch, Redirect } from "react-router-dom";
import Classification from "../classification";
import Articles from "@containers/admin/admin-article";
import PhotoAlbum from "@common/photo-album";
import ModifyPwd from "@containers/admin/modify-pwd";
import ArticleEdit from "@containers/admin/article-edit";
import HomePage from "../home-page";
import ViewArticle from "@containers/admin/view-article";
import "./index.scss";

export default class AdminHome extends React.Component {

    render() {
        return (
            <>
                <NavBar/>
                <section className="main-container">
                    <Switch>
                        <Route path="/xsys" exact component={HomePage}/>
                        <Route path="/xsys/cls" exact component={Classification}/>
                        <Route path="/xsys/photo-album" exact component={PhotoAlbum}/>
                        <Route path="/xsys/article/edit" exact component={ArticleEdit}/>
                        <Route path="/xsys/articles/:page?" exact component={Articles}/>
                        <Route path="/xsys/article/:id" exact component={ViewArticle}/>
                        <Redirect to="/404"/>
                    </Switch>
                    <ModifyPwd/>
                </section>
            </>
        );
    }
} 