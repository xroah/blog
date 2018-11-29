import * as React from "react";
import {Button, Input, Form} from "antd";
import {Link} from "react-router-dom";
import {FormComponentProps} from "antd/lib/form";

interface Props extends FormComponentProps {
    history: any;
}

class Register extends React.Component<Props, any> {

    state = {
        userName: "",
        email: "",
        password: "",
        confirm: ""
    };

    handleSubmit = () => {
        this.props.form.validateFields((err: any, values: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log(values)
            }

        });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let target = event.target;
        this.props.form.setFieldsValue({
            [target.name]: target.value
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {Item} = Form;
        return (
            <div className="center-box">
                <Form>
                    <Item>
                        {getFieldDecorator("userName", {
                            rules: [{required: true, message: "用户名不能为空"}, {
                                pattern: /\w/,
                                message: "用户名输入不正确(字母、数字或下划线)"
                            }],
                        })(
                            <Input
                                type="text"
                                name="userName"
                                placeholder="请输入用户名(限字母、数字和下划线)"
                                onChange={this.handleChange}/>
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator("email", {
                            rules: [{
                                required: true,
                                message: "邮箱不能为空"
                            }, {pattern: /^[\w.-]+@[a-z\d-_]+(?:\.[a-z\d]+)+$/i, message: "邮箱格式不正确"}],
                        })(
                            <Input
                                type="text"
                                name="email"
                                placeholder="请输入邮箱,帮助找回密码"/>
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator("password", {
                            rules: [{required: true, message: "密码不能为空"}],
                        })(
                            <Input
                                type="password"
                                name="passowrd"
                                placeholder="请输入密码"/>
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator("confirm", {
                            rules: [{required: true, message: "请重复输入密码"}, {
                                validator: (rule: any, value: string, callback: Function) => {
                                    const errors: Array<string> = [];
                                    let password = this.props.form.getFieldValue("password");
                                    let confirm = this.props.form.getFieldValue("confirm");
                                    if (!password || !confirm) {
                                        callback(errors);
                                        return;
                                    }
                                    if (password !== confirm) {
                                        errors.push("两次输入的密码不一致");
                                    }
                                    callback(errors);
                                }
                            }],
                        })(
                            <Input
                                type="password"
                                name="confirm"
                                placeholder="请重复输入密码"/>
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator("idCode", {
                            rules: [{required: true, message: "验证码不能为空"}],
                        })(
                            <Input
                                type="text"
                                name="idCode"
                                className="code-input"
                                placeholder="请输入验证码"/>
                        )}
                        <img className="code-img"/>
                    </Item>
                    <Button type="primary" className="login-button" onClick={this.handleSubmit}>注册</Button>
                    <div className="to-other">
                        <span>已有账号?</span>
                        <Link to="/user/login">去登录</Link>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Form.create({})(Register);