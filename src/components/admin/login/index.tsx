import * as React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import _fetch from "@common/fetch";
import { FETCH_BACKGROUND, ADMIN_LOGIN } from "@common/api";
import InfoOutlined from "@material-ui/icons/InfoOutlined"
import Tooltip from "@material-ui/core/Tooltip";
import message from "@common/message";
import md5 from "blueimp-md5";
import { RouteComponentProps } from "react-router-dom";
import { encrypt } from "@common/util";
import "./index.scss";

const SAVE_INFO_KEY = "accountInfo";

export default class Login extends React.Component<RouteComponentProps> {
    state = {
        bgStyle: {},
        copyright: "",
        password: "",
        username: "",
        autoLogin: false,
        savePassword: false,
        usernameError: false,
        passwordError: false
    };

    getSavedInfo() {
        let info: any = JSON.parse(localStorage.getItem(SAVE_INFO_KEY));
        if (info) {
            this.setState({
                password: encrypt(atob(info.password), info.username),
                username: atob(info.username),
                autoLogin: info.autoLogin,
                savePassword: true
            });
        }
    }

    async componentDidMount() {
        this.getSavedInfo();
        try {
            let img: any = await _fetch(FETCH_BACKGROUND);
            this.setState({
                copyright: img.copyright,
                bgStyle: {
                    backgroundImage: `url(${img.url})`
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleFocus = (evt: React.FocusEvent) => {
        let { bgStyle } = this.state;
        this.setState({
            bgStyle: {
                ...bgStyle,
                filter: evt.type === "focus" ? "brightness(50%)" : "brightness(100%)"
            }
        });
    }

    handleChange = (evt: React.ChangeEvent<HTMLInputElement>, type: string) => {
        let target = evt.target;
        if (target.type === "text") {
            this.setState({
                [type]: target.value
            });
        } else if (target.type === "checkbox") {
            this.setState({
                [type]: target.checked
            });
            //if autoLogin was checked, check savePassword
            if (type === "autoLogin" && target.checked) {
                this.setState({
                    savePassword: true
                });
            } else if (type === "savePassword" && !target.checked) {
                //if savePassword was not checked, uncheck autoLogin
                this.setState({
                    autoLogin: false
                });
            }
        }
    }

    handleLoginSuccess = () => {
        let {
            username,
            password,
            savePassword,
            autoLogin
        } = this.state;
        if (savePassword) {
            username = btoa(username);
            password = btoa(encrypt(password, username));
            localStorage.setItem(SAVE_INFO_KEY, JSON.stringify({
                username,
                password,
                autoLogin
            }));
        } else {
            localStorage.removeItem(SAVE_INFO_KEY);
        }
        this.props.history.push("/xsys");
    }

    login = () => {
        let { username, password } = this.state;
        if (!username.trim() || !password.trim()) {
            message.error("用户名和密码都不能为空");
            return;
        }
        _fetch(ADMIN_LOGIN, {
            method: "post",
            body: {
                username,
                password: md5(password)
            }
        }).then(this.handleLoginSuccess).catch(() => { });
    }

    render() {
        let {
            bgStyle,
            copyright,
            password,
            username,
            savePassword,
            autoLogin
        } = this.state;
        return (
            <section className="login-container">
                <div className="bg" style={bgStyle}></div>
                <Tooltip placement="left" title={copyright}>
                    <span className="copyright">
                        <InfoOutlined fontSize="large" />
                    </span>
                </Tooltip>
                <div className="login-wrapper">
                    <div className="login-row">
                        <TextField
                            onFocus={this.handleFocus}
                            onBlur={this.handleFocus}
                            onChange={evt => this.handleChange(evt as React.ChangeEvent<HTMLInputElement>, "username")}
                            value={username}
                            placeholder="用户名"
                            className="login-item"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person />
                                    </InputAdornment>
                                ),
                            }} />
                    </div>
                    <div className="login-row">
                        <TextField
                            onFocus={this.handleFocus}
                            onBlur={this.handleFocus}
                            onChange={evt => this.handleChange(evt as React.ChangeEvent<HTMLInputElement>, "password")}
                            value={password}
                            placeholder="密码"
                            className="login-item"
                            type="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            }} />
                    </div>
                    <div className="checkbox-wrapper">
                        <FormControlLabel
                            className="form-label"
                            control={
                                <Checkbox
                                    onChange={evt => this.handleChange(evt, "savePassword")}
                                    checked={savePassword}
                                    color="primary"
                                />
                            }
                            label="记住密码"
                        />
                        <FormControlLabel
                            className="form-label"
                            control={
                                <Checkbox
                                    onChange={evt => this.handleChange(evt, "autoLogin")}
                                    checked={autoLogin}
                                    data-type="al"
                                    color="primary"
                                />
                            }
                            label="自动登录"
                        />
                    </div>
                    <div className="login-row">
                        <Button
                            variant="contained"
                            className="login-item"
                            color="primary"
                            onClick={this.login}
                        >登录</Button>
                    </div>
                </div>
            </section>
        );
    }
}