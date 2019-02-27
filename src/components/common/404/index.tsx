import * as React from "react";
import { Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/menu";
let img = require("@images/404.png");

interface Props {
    toUrl?: string;
}

export default class E404 extends React.Component<Props> {
    render() {
        let { toUrl } = this.props;
        return (
            <div>
                <img src={img}/>
                <Button variant="contained" color="primary">按钮</Button>
                <Button variant="contained" color="secondary">
                    <MenuIcon />
                </Button>
                <div>Hello React</div>
            </div>
        );
    }
}