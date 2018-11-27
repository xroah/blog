import * as React from "react";
import { Button, Input } from "antd";
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
                <div className="input-wrapper">
                    <Input type="text" placeholder="请输入用户名(限字母、数字和下划线)"/>
                </div>
                <div className="input-wrapper">
                    <Input type="text" placeholder="请输入邮箱,帮助找回密码"/>
                </div>
                <div className="input-wrapper">
                    <Input type="password" placeholder="请输入密码"/>
                </div>
                <div className="input-wrapper">
                    <Input type="password" placeholder="请重复输入密码"/>
                </div>
                <div className="input-wrapper">
                    <Input type="text" className="code-input" placeholder="请输入验证码"/>
                    <img className="code-img"/>
                </div>
                <div className="input-wrapper">
                     <Button type="primary" className="register-button">注册</Button>
                </div>
                <div>
                    <span>已有账号?</span>
                    <Link to="/user/login">去登录</Link>
                </div>
            </div>
        );
    }
}