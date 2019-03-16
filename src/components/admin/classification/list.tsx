import * as React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Button,
    Zoom
} from "@material-ui/core";
import {
    Edit,
    Delete
} from "@material-ui/icons";
import { formatDate } from "@common/util";

interface Props {
    list?: Array<any>;
    fetchCls?: () => any;
}

export default class extends React.Component<Props> {

    componentDidMount() {
        this.props.fetchCls();
    }

    handleEdit = () => {

    }

    renderList = () => {
        let { list } = this.props;
        if (!list || !list.length) return null;
        return list.map((item: any, index) => {
            let timeout = 50 + index * 50;
            if (item.isNew) timeout = 0;
            return (
                <Zoom in={true} key={item._id} timeout={timeout}>
                    <Card className="cls-card">
                        <CardHeader title={item.name} subheader={formatDate(new Date(item.createTime))} />
                        <CardContent className="cls-operate">
                            <Button
                                variant="contained"
                                color="primary">
                                <Edit />
                            </Button>
                            <Button
                                style={{ marginLeft: 10 }}
                                variant="contained"
                                color="secondary">
                                <Delete />
                            </Button>
                        </CardContent>
                    </Card>
                </Zoom >
            );
    });
    }

    render() {
        return (
            <div className="cls-wrapper">
                {this.renderList()} 
            </div>
        );
    }
}