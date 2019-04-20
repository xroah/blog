import * as React from "react";
import {
    List,
    ListItem
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

interface Props extends React.HTMLAttributes<any> {
    onClick?: () => any;
}

export default class NavMenu extends React.Component<Props> {

    static defaultProps = {
        onClick: () => { }
    };

    render() {

        let { 
            onClick,
            ...otherProps
         } = this.props;

        return (
            <List onClick={onClick} {...otherProps}>
                <ListItem>
                    <NavLink to="/" exact className="nav-link">首页</NavLink>
                </ListItem>
                <ListItem>
                    <NavLink to="/photo-album" exact className="nav-link">相册</NavLink>
                </ListItem>
                <ListItem>
                    <NavLink to="/about" exact className="nav-link">关于</NavLink>
                </ListItem>
            </List>
        );
    }

}