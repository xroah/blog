import * as React from "react";
import {
    withRouter,
    RouteComponentProps
} from "react-router-dom";
import { Button } from "@material-ui/core";

const img = require("@images/no_article.png");

interface Props extends RouteComponentProps {
    message: string;
}

class NotExists extends React.Component<Props> {

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div
                style={{ marginTop: 15 }}
                className="text-center">
                <img src={img} />
                <p
                    style={{ color: "#d93025", margin: "15px 0" }}
                    className="hint-message">{this.props.message}</p>
                <Button variant="contained" onClick={this.goBack}>返回</Button>
            </div>
        );
    }
}

export default withRouter(NotExists);