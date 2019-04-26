import * as React from "react";
import UpdateLog from "../update-log";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    List,
    ListItem,
    Link
} from "@material-ui/core";
import "./index.scss";

export default class About extends React.Component {

    componentDidMount() {
        document.title = "关于";
    }

    render() {
        return (
            <div className="about-container">
                <Card className="card">
                    <CardHeader title="关于" />
                    <CardContent>
                        <p>本站主要用于平时的学习记录，欢迎大家多多交流!</p>
                        <Typography style={{ marginTop: 10 }}>联系我:</Typography>
                        <List>
                            <ListItem>
                                <p>
                                    Github: 
                                    <Link color="primary" href="//github.com/xroah">xroah</Link>
                                </p>
                            </ListItem>
                            <ListItem>
                                <p>Email: raowanbin66@gmail.com</p>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
                <UpdateLog />
            </div>
        );
    }
}