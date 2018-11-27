import * as React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface Props {
    history: any;
}

export default class Register extends React.Component<Props> {

    toLogin = () => {
        this.props.history.push("/user/login");
    }

    render() {
        return (
            <div className="login-center-box">
                注册页面
                <Link to="/user/login">去登陆</Link>
            </div>
        );
    }
}