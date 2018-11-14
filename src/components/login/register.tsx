import * as React from "react";
import { Button } from "antd";

interface Props {
    history: any;
}

export default class Register extends React.Component<Props> {

    toLogin = () => {
        this.props.history.push("/user/login");
    }

    render() {
        return (
            <div>
                注册页面
                <Button onClick={this.toLogin}>去登录</Button>
            </div>
        );
    }
}