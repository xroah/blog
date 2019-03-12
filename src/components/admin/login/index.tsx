import * as React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import _fetch from "@common/fetch";
import { FETCH_BACKGROUND } from "@common/api";
import InfoOutlined from "@material-ui/icons/InfoOutlined"
import Tooltip from "@material-ui/core/Tooltip";
import message from "@common/message";
import { RouteComponentProps } from "react-router-dom";
import _login, { getInfo, saveInfo, delInfo } from "@common/login";
import "./index.scss";

export default class Login extends React.Component<RouteComponentProps> {
    state = {
        bgStyle: {},
        copyright: "",
        password: "",
        username: "",
        autoLogin: false,
        savePassword: false,
        usernameError: false,
        passwordError: false,
        disabled: false
    };

    getSavedInfo() {
        let info: any = getInfo();
        if (info) {
            this.setState({
                username: info.username,
                password: info.password,
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
        if (target.type === "text" || target.type === "password") {
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
            saveInfo(username, password, autoLogin);
        } else {
            delInfo();
        }
        this.props.history.push("/xsys");
    }

    handleKeydown = (evt: React.KeyboardEvent) => {
        if (evt.key.toLowerCase() === "enter") {
            this.login();
        }
    }

    login = async () => {
        let { username, password } = this.state;
        if (!username.trim() || !password.trim()) {
            message.error("用户名和密码都不能为空");
            return;
        }
        this.setState({
            disabled: true
        });
        try {
            await _login(username, password);
            this.handleLoginSuccess();
        } catch (error) {
            this.setState({
                disabled: false
            });
        }
    }

    render() {
        let {
            bgStyle,
            copyright,
            password,
            username,
            savePassword,
            autoLogin,
            disabled
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
                            onKeyDown={this.handleKeydown}
                            value={username}
                            placeholder="用户名"
                            className="login-item"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person color="action" />
                                    </InputAdornment>
                                ),
                            }} />
                    </div>
                    <div className="login-row">
                        <TextField
                            onFocus={this.handleFocus}
                            onBlur={this.handleFocus}
                            onChange={evt => this.handleChange(evt as React.ChangeEvent<HTMLInputElement>, "password")}
                            onKeyDown={this.handleKeydown}
                            value={password}
                            placeholder="密码"
                            className="login-item"
                            type="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
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
                            disabled={disabled}
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