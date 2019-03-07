import * as React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Button,
    Zoom
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { formatDate } from "@common/util";
import _fetch from "@common/fetch";
import { FETCH_CLS } from "@common/api";
import hint from "@common/hint-dialog";
import "./index.scss";

export default class Classification extends React.Component {

    state = {
        list: [],
        open: false
    };

    componentDidMount() {
        _fetch(FETCH_CLS).then(res => {
            this.setState({
                list: res
            });
        }).catch(e => e);
    }

    handleEdit = () => {

    }

    handleDel = () => {
        hint.confirm("确定要删除吗?", () => {
            console.log("deleted")
        });
    }

    renderCard() {
        let { list } = this.state;
        if (!list || !list.length) return null;
        return list.map((item: any, index) => {
            var timeout = 300 + index * 300;
            return (
                <Zoom in={true} key={item._id} timeout={timeout}>
                    <Card className="cls-card">
                        <CardHeader title={item.name} subheader={formatDate(new Date(item.createTime))} />
                        <CardContent className="cls-operate">
                            <Button variant="contained" color="primary">
                                <Edit />
                            </Button>
                            <Button
                                style={{ marginLeft: 10 }}
                                variant="contained"
                                color="secondary"
                                onClick={this.handleDel}>
                                <Delete />
                            </Button>
                        </CardContent>
                    </Card>
                </Zoom>
            );
        });
    }

    render() {
        return (
            <section className="cls-wrapper">
                {this.renderCard()}
            </section>
        );
    }
}