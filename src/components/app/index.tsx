import * as React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "@common/loading";
import E404 from "@common/404";
import { Publish } from "@material-ui/icons";
import {
    IconButton,
    Zoom
} from "@material-ui/core";
import "quill/dist/quill.snow.css";
import "./index.scss";

const _loading = {
    loading: Loading
}

const AdminHome = Loadable({
    loader: () => import("../admin/home"),
    ..._loading
});

const AdminLogin = Loadable({
    loader: () => import("../admin/login"),
    ..._loading
});

const UserHome = Loadable({
    loader: () => import("../visitor/home"),
    ..._loading
});

class App extends React.Component {

    state = {
        backTopVisible: false
    };

    scrollTimer: NodeJS.Timeout;

    toTopTimer: number;

    componentDidMount() {
        this.showBackTop();
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("wheel", this.cancelScroll);
    }

    showBackTop = () => {
        let sTop = document.documentElement.scrollTop || document.body.scrollTop;
        let winH = window.innerHeight;
        if (sTop >= winH * 1.5) {
            this.setState({
                backTopVisible: true
            });
        } else {
            this.setState({
                backTopVisible: false
            });
        }
    }

    cancelScroll = () => {
        if (this.toTopTimer !== undefined) {
            cancelAnimationFrame(this.toTopTimer);
        }
    }

    handleScroll = () => {
        if (this.scrollTimer !== undefined) {
            clearTimeout(this.scrollTimer);
        }
        this.scrollTimer = setTimeout(this.showBackTop, 500);
    }

    backToTop = () => {
        let body = document.body;
        let html = document.documentElement;
        let sTop = body.scrollTop || html.scrollTop;
        if (sTop > 0) {
            html.scrollTop = sTop - sTop / 5;
            this.toTopTimer = requestAnimationFrame(this.backToTop);
        }
    }

    render() {
        return (
            <>
                <Switch>
                    <Route path="/xsys/login" exact component={AdminLogin} />
                    <Route path="/xsys" component={AdminHome} />
                    <Route path="/404" exact component={E404} />
                    <Route path="/" component={UserHome} />
                </Switch>
                <Zoom in={this.state.backTopVisible}>
                    <IconButton onClick={this.backToTop} className="back-to-top">
                        <Publish fontSize="large" />
                    </IconButton>
                </Zoom>
            </>
        );
    }
}

export default hot(App);