import * as React from "react";
import NavBar from "@components/admin/nav-bar";
import { Route, Switch, Redirect } from "react-router-dom";
import Classification from "../classification";
import Articles from "@containers/admin/admin-article";
import PhotoAlbum from "@common/photo-album";
import ModifyPwd from "@containers/admin/modify-pwd";
import ArticleEdit from "../article-edit";
import "./index.scss";
import HomePage from "../home-page";

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
                        <Route path="/xsys/articles/edit" exact component={ArticleEdit}/>
                        <Route path="/xsys/articles" component={Articles}/>
                        <Redirect to="/404"/>
                    </Switch>
                    <ModifyPwd/>
                </section>
            </>
        );
    }
} 