import * as React from "react";
import { Button } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./index.scss";

let img = require("@images/404.png");

interface Props extends RouteComponentProps {
    toUrl?: string;
}

class E404 extends React.Component<Props> {

    toHome = () => this.props.history.push("/");

    back = () => this.props.history.goBack();

    render() {
        let { toUrl } = this.props;
        return (
            <div className="wrapper-404">
                <img src={img} />
                <p className="message">对不起,您访问的页面不存在!</p>
                <div>
                    <Button
                        onClick={this.toHome}
                        variant="contained"
                        color="primary">主页</Button>
                    <Button
                        onClick={this.back}
                        style={{ marginLeft: 20 }}
                        variant="contained">返回</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(E404);