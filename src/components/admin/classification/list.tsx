import * as React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Button,
    IconButton,
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
            <>确定要删除<span style={{ color: "#f50057", fontWeight: "bold" }}> {name} </span>吗?</>,
            () => {
                this.props.delCls(id);
            });
    }

    renderList = () => {
        let { list } = this.props;
        if (!list || !list.length) return null;
        return list.map((item: any, index) => {
            return (
                <Zoom in={true} key={item._id} timeout={0}>
                    <Card className="cls-card">
                        <CardHeader title={item.name} subheader={formatDate(new Date(item.createTime))} />
                        <CardContent className="cls-operate">
                            <IconButton
                                onClick={this.handleEdit(item._id, item.name, "edit")}
                                color="primary">
                                <Edit />
                            </IconButton>
                            <IconButton
                                style={{ marginLeft: 10 }}
                                onClick={this.handelDel(item._id, item.name)}
                                color="secondary">
                                <Delete />
                            </IconButton>
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