import * as React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
    IconButton,
    Menu,
    MenuItem
} from "@material-ui/core";
import {
    withRouter,
    RouteComponentProps
} from "react-router-dom";
import { logOut } from "@common/login";

interface Props extends RouteComponentProps {
    showPwdDialog?: () => void;
}

class UserMenu extends React.Component<Props> {

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
        } catch (err) { }
        this.props.history.push("/xsys/login");
    }

    modifyPwd = () => {
        this.closeMenu();
        this.props.showPwdDialog();
    }

    render() {
        let { anchorEl } = this.state;
        return (
            <>
                <IconButton color="inherit" onClick={this.openMenu}>
                    <AccountCircle fontSize="large" />
                </IconButton>
                <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={this.closeMenu}>
                    <MenuItem onClick={this.modifyPwd}>修改密码</MenuItem>
                    <MenuItem onClick={this.logout}>退出</MenuItem>
                </Menu>
            </>
        );
    }
}

export default withRouter(UserMenu);