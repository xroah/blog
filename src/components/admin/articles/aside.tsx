import * as React from "react";
import {
    List,
    ListItem
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

export default class Aside extends React.Component {
    render() {
        return (
            <aside className="article-nav">
                <List>
                    <ListItem>
                        <NavLink to="/xsys/articles" exact className="nav-link">已发布</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/xsys/articles/drafts" exact className="nav-link">草稿箱</NavLink>
                    </ListItem>
                </List>
            </aside>
        );
    }
}