import * as React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface Props {
    history: any;
}

export default class Login extends React.Component<Props> {

    toRegister = () => {
        this.props.history.push("/user/register");
    }

    render() {
        return (
            <div className="login-container">
                登录页面
                <Link to="/user/register">去注册</Link>
            </div>
        );
    }
}