import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";
import { logOut } from "@common/login";
import { withRouter, RouteComponentProps } from "react-router-dom";
import "./index.scss";

class NavBar extends React.Component<RouteComponentProps> {

    state = {
        anchorEl: null
    };

    openMenu = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
        this.setState({
            anchorEl: evt.target
        });
    }

    closeMenu = () => {
        this.setState({
            anchorEl: null
        });
    }

    logout = async () => {
        this.closeMenu();
        try {
            await logOut();
        }catch(err){}
        this.props.history.push("/xsys/login");
    }

    render() {
        let { anchorEl } = this.state;
        return (
            <>
                <AppBar>
                    <ToolBar className="admin-nav-bar">
                        <div className="nav-left">
                            <h3 color="inherit" style={{ marginRight: 10 }}>后台管理系统</h3>
                            <NavLink to="/xsys" exact className="nav-link">首页</NavLink>
                            <NavLink to="/xsys/cls" exact className="nav-link">文章分类</NavLink>
                            <NavLink to="/xsys/photo-album" exact className="nav-link">相册</NavLink>
                        </div>
                        <div className="nav-right">
                            <IconButton color="inherit" onClick={this.openMenu}>
                                <AccountCircle fontSize="large" />
                            </IconButton>
                        </div>
                    </ToolBar>
                </AppBar>
                <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={this.closeMenu}>
                    <MenuItem onClick={this.closeMenu}>修改密码</MenuItem>
                    <MenuItem onClick={this.logout}>退出</MenuItem>
                </Menu>
            </>
        );
    }
}

export default withRouter(NavBar);