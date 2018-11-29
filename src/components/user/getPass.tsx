import * as React from "react";
import {Form, Button, Input} from "antd";
import {Link} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {FormComponentProps} from "antd/lib/form";

class GetPass extends React.Component<FormComponentProps, any> {
    prevStep: number = 1;

    state = {
        step: this.prevStep,
        transitionCls: ""
    };


    toNext(step: number) {
        let cls: string = "translate-x-scale";
        if (step !== this.prevStep) {
            if (step < this.prevStep) {
                cls = "translate-x-scale-reverse";
            }
            this.prevStep = step;
            this.setState({
                transitionCls: cls
            }, () => {
                this.setState({
                    step
                });
            });
        }
    }

    getHTML() {
        const {Item} = Form;
        const {getFieldDecorator} = this.props.form;
        const {step, transitionCls} = this.state;
        let html;
        switch (step) {
            case 1:
                html = (
                    <CSSTransition key={1} timeout={300} classNames={transitionCls}>
                        <div className="center-box get-password-box">
                            <p className="title-message">找回密码</p>
                            <Form>
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
                                            placeholder="请输入注册邮箱"/>
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
                            </Form>
                            <Button
                                htmlType="button"
                                type="primary"
                                className="login-button"
                                onClick={() => this.toNext(2)}>下一步</Button>
                        </div>
                    </CSSTransition>
                );
                break;
            case 2:
                html = (
                    <CSSTransition key={2} timeout={300} classNames={transitionCls}>
                        <div className="center-box get-password-box">
                            <p className="title-message">验证邮箱</p>
                            <div className="ant-form-item">XXXX@qq.com</div>
                            <Form>
                                <Item>
                                    {getFieldDecorator("emailIdCode", {
                                        rules: [{required: true, message: "验证码不能为空"}],
                                    })(
                                        <Input
                                            type="text"
                                            name="emailIdCode"
                                            className="email-code-input"
                                            placeholder="请输入收到的验证码"/>
                                    )}
                                    <Button htmlType="button" className="send-email-btn">发送邮件</Button>
                                </Item>
                            </Form>
                            <div className="change-step-wrapper">
                                <Button
                                    htmlType="button"
                                    type="primary"
                                    onClick={() => this.toNext(1)}>上一步</Button>
                                <Button
                                    htmlType="button"
                                    type="primary"
                                    onClick={() => this.toNext(3)}>下一步</Button>
                            </div>
                        </div>
                    </CSSTransition>
                );
                break;
            case 3:
                html = (
                    <CSSTransition key={3} timeout={300} classNames={transitionCls}>
                        <div className="center-box get-password-box">
                            <p className="title-message">重置密码</p>
                            <Form>
                                <Item>
                                    {getFieldDecorator("password", {
                                        rules: [{required: true, message: "密码不能为空"}],
                                    })(
                                        <Input
                                            type="password"
                                            name="password"
                                            placeholder="请输入密码"/>
                                    )}
                                </Item>
                                <Item>
                                    {getFieldDecorator("confirm", {
                                        rules: [{required: true, message: "密码不能为空"}],
                                    })(
                                        <Input
                                            type="password"
                                            name="confirm"
                                            placeholder="请重复输入密码"/>
                                    )}
                                </Item>
                            </Form>
                            <div className="change-step-wrapper">
                                <Button
                                    htmlType="button"
                                    type="primary"
                                    onClick={() => this.toNext(2)}>上一步</Button>
                                <Button
                                    htmlType="button"
                                    type="primary">确定</Button>
                            </div>
                        </div>
                    </CSSTransition>
                );
                break;
        }
        return html;
    }

    render() {
        return (
            <TransitionGroup component={null}>
                {this.getHTML()}
            </TransitionGroup>
        );
    }
}

export default Form.create({})(GetPass);