import * as React from "react";
import {
    AppBar,
    Toolbar
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import UserMenu from "@containers/admin/user-menu";
import "./index.scss";

export default class NavBar extends React.Component {

    render() {
        return (
            <>
                <AppBar className="admin-nav-bar nav-bar">
                    <Toolbar className="toolbar">
                        <div className="nav-left">
                            <h3 color="inherit" style={{ marginRight: 10 }}>博客后台</h3>
                            <NavLink to="/xsys" exact className="nav-link">首页</NavLink>
                            <NavLink to="/xsys/articles" className="nav-link">文章管理</NavLink>
                            <NavLink to="/xsys/cls" exact className="nav-link">分类管理</NavLink>
                            <NavLink to="/xsys/comments" className="nav-link">评论管理</NavLink>
                            <NavLink to="/xsys/photo-album" className="nav-link">相册</NavLink>
                            <NavLink to="/xsys/version" exact className="nav-link">版本</NavLink>
                            <NavLink to="/xsys/about" exact className="nav-link">关于</NavLink>
                        </div>
                        <div className="nav-right">
                            <UserMenu/>
                        </div>
                    </Toolbar>
                </AppBar>
            </>
        );
    }
}