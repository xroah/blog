import * as React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Button,
    Zoom
} from "@material-ui/core";
import {
    Add,
    Edit,
    Delete
} from "@material-ui/icons";
import { formatDate } from "@common/util";
import hint from "@common/hint-dialog";

interface Props {
    list?: Array<any>;
    fetchCls?: () => any;
    showEditDialog?: () => any;
    setEditInfo?: (arg: Object) => any;
    delCls?: (arg: string) => any;
}

export default class extends React.Component<Props> {

    componentDidMount() {
        this.props.fetchCls();
    }

    handleEdit = (id: string, value: string, type: string) => () => {
        let {
            showEditDialog,
            setEditInfo
        } = this.props;
        showEditDialog();
        setEditInfo({
            type,
            id,
            value
        });
    }

    handelDel = (id: string, name: string) => () => {
        hint.confirm(
            <>确定要删除<span style={{ color: "#f50057", fontWeight:"bold" }}> {name} </span>吗?</>,
            () => {
                this.props.delCls(id);
            });
    }

    renderList = () => {
        let { list } = this.props;
        if (!list || !list.length) return null;
        return list.map((item: any, index) => {
            console.log("=======>", item.createTime)
            return (
                <Zoom in={true} key={item._id} timeout={0}>
                    <Card className="cls-card">
                        <CardHeader title={item.name} subheader={formatDate(new Date(item.createTime))} />
                        <CardContent className="cls-operate">
                            <Button
                                onClick={this.handleEdit(item._id, item.name, "edit")}
                                variant="contained"
                                color="primary">
                                <Edit />
                            </Button>
                            <Button
                                style={{ marginLeft: 10 }}
                                onClick={this.handelDel(item._id, item.name)}
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleEdit("", "", "add")}
                    className="add-right-bottom">
                    <Add fontSize="large" />
                </Button>
            </div>
        );
    }
}