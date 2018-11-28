import * as React from "react";
import {Button, Input, Checkbox} from "antd";
import {Link} from "react-router-dom";

interface Props {
    history: any;
}

export default class Login extends React.Component<Props> {

    handleFocus(event: React.FocusEvent<HTMLInputElement>) {
        let target: Node = event.target as Node;
        let parentNode: Element = target.parentNode as Element;
        if (event.type === "focus") {
            parentNode.classList.add("focused");
        } else {
            parentNode.classList.remove("focused");
        }
    }

    render() {
        return (
            <div className="login-center-box">
                <p className="daily-sentence"></p>
                <div className="input-wrapper login-input-wrapper">
                    <Input
                        placeholder="请输入用户名"
                        onFocus={this.handleFocus}
                        onBlur={this.handleFocus}/>
                </div>
                <div className="input-wrapper login-input-wrapper">
                    <Input
                        type="password"
                        placeholder="请输入密码"
                        onFocus={this.handleFocus}
                        onBlur={this.handleFocus}/>
                </div>
                <div className="remember">
                    <Checkbox>记住密码</Checkbox>
                    <a href="javascript:;">忘记密码?</a>
                </div>
                <Button type="primary" htmlType="button" className="login-button">登录</Button>
                <div>
                    <span>没有账号?</span>
                    <Link to="/user/register">去注册</Link>
                </div>
            </div>
        );
    }
}