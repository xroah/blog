import * as React from "react";
import { Button } from "antd";

interface Props {
    history: any;
}

export default class Login extends React.Component<Props> {

    toRegister = () => {
        this.props.history.push("/user/register");
    }

    render() {
        return (
            <div>
                登录页面
                <Button onClick={this.toRegister}>去注册</Button>
            </div>
        );
    }
}