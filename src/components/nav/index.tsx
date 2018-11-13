import * as React from "react"; 
import {Button} from "antd";
import "./index.scss";

export default class Nav extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        console.log(this.props)
        return (
            <div>
                nav
                <Button type="primary">click me</Button>
            </div>
        );
    }
}