import * as React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./index.scss";

export default class Login extends React.Component {
    render() {
        return (
            <section className="login-container">
                <div className="bg"></div>
                <div className="login-wrapper">
                    <div className="login-row">
                        <TextField
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
                            placeholder="密码"
                            className="login-item"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            }} />
                    </div>
                    <div>
                        <FormControlLabel
                            className="form-label"
                            control={
                                <Checkbox
                                    color="primary"
                                />
                            }
                            label="记住密码"
                        />
                    </div>
                    <div className="login-row">
                        <Button variant="contained" className="login-item" color="primary">登录</Button>
                    </div>
                </div>
            </section>
        );
    }
}