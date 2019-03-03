import * as React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "@common/loading";
import "quill/dist/quill.snow.css";
import "./index.scss";

const _loading = {
    loading: Loading
}

const AdminHome = Loadable({
    loader: () => import("../admin/home"),
    ..._loading
});
const E404 = Loadable({
    loader: () => import("@common/404"),
    ..._loading
});
const UserHome = Loadable({
    loader: () => import("../user/home"),
    ..._loading
});

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/xsys" component={AdminHome} />
                    <Route path="/404" component={E404}/>
                    <Route path="/" component={UserHome} />
                </Switch>
            </Router>
        );
    }
}

export default hot(App);