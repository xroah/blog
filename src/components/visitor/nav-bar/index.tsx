import * as React from "react";
import { NavLink } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    List,
    ListItem,
    Drawer
} from "@material-ui/core";
import { Menu, Clear } from "@material-ui/icons";
import "./index.scss";

export default class NavBar extends React.Component {

    state = {
        visible: false
    };

    timer: any;

    componentDidMount() {
        window.addEventListener("resize", this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    openMenu = () => {
        this.setState({
            visible: true
        });
    }

    closeMenu = () => {
        this.setState({
            visible: false
        });
    }

    resize = () => {
        let _resize = () => {
            let width = window.innerWidth;
            if (width >= 640 && this.state.visible) {
                this.closeMenu();
            }
        }
        if (this.timer !== undefined) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(_resize, 500);
    }

    render() {
        let { visible } = this.state;

        return (
            <>
                <AppBar
                    className="nav-bar"
                    position="fixed">
                    <Toolbar className="toolbar">
                        <IconButton
                            onClick={this.openMenu}
                            className="show-menu-btn"
                            style={{ color: "#fff" }}>
                            <Menu color="inherit" />
                        </IconButton>
                        <div className="nav-menu">
                            <NavLink to="/" exact className="nav-link">首页</NavLink>
                            <NavLink to="/photo-album" className="nav-link">相册</NavLink>
                            <NavLink to="/about" className="nav-link">关于</NavLink>
                        </div>
                    </Toolbar>
                    <Drawer className="drawer-nav" open={visible} onClose={this.closeMenu}>
                        <IconButton className="hide-menu-btn" onClick={this.closeMenu}>
                            <Clear fontSize="large" />
                        </IconButton>
                        <List className="drawer-menu" onClick={this.closeMenu}>
                            <ListItem>
                                <NavLink to="/" exact className="nav-link">首页</NavLink>
                            </ListItem>
                            <ListItem>
                                <NavLink to="/photo-album" exact className="nav-link">相册</NavLink>
                            </ListItem>
                        </List>
                    </Drawer>
                </AppBar>
            </>
        );
    }
}