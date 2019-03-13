import * as React from "react";
import { NavLink } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Button,
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
                        <Button
                            onClick={this.openMenu}
                            className="show-menu-btn"
                            style={{ color: "#fff" }}>
                            <Menu color="inherit" />
                        </Button>
                        <div className="nav-menu">
                            <NavLink to="/" exact className="nav-link">首页</NavLink>
                            <NavLink to="/photo-album" exact className="nav-link">相册</NavLink>
                        </div>
                    </Toolbar>
                    <Drawer className="drawer-nav" open={visible}>
                        <Button className="hide-menu-btn" onClick={this.closeMenu}>
                            <Clear fontSize="large" />
                        </Button>
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