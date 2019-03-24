import * as React from "react";
import {
    withRouter,
    RouteComponentProps
} from "react-router-dom";
import { Button } from "@material-ui/core";

const noArticle = require("@images/no_article.png");
const noResult = require("@images/no_result.png");

let imgMap = {
    noArticle,
    noResult
};

interface Props extends RouteComponentProps {
    message: string;
    img?: "noArticle" | "noResult";
}

class NotExists extends React.Component<Props> {

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        let {
            message,
            img = "noArticle"
        } = this.props;
        return (
            <div
                style={{ paddingTop: 15, margin: "0 auto" }}
                className="text-center">
                <img src={imgMap[img]} />
                <p
                    style={{ color: "#d93025", margin: "15px 0" }}
                    className="hint-message">{message}</p>
                <Button variant="contained" onClick={this.goBack}>返回</Button>
            </div>
        );
    }
}

export default withRouter(NotExists);