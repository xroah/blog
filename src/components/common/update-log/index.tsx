import * as React from "react";
import {
    List,
    ListItem
} from "@material-ui/core";
import { FETCH_VERSION } from "@common/api";
import _fetch from "@common/fetch";
import { formatDate } from "@common/util";
import { loading } from "@common/loading";
import "./index.scss";

export default class UpdateLog extends React.Component {

    state = {
        list: []
    };

    componentDidMount() {
        this.fetchVersion();
    }

    fetchVersion = async () => {
        loading.show();
        try {
            let ret = await _fetch(FETCH_VERSION);
            this.setState({
                list: ret
            });
        } catch (err) {

        }
        loading.hide();
    }

    render() {
        const { list } = this.state;

        return (
            <div className="update-log-container">
                <List className="log-list">
                    {
                        list.map(
                            item => (
                                <ListItem key={item._id} className="list-item">
                                    <p>
                                        <span className="time">{formatDate(item.createTime)}</span>
                                        <span className="version">{item.version}</span>
                                    </p>
                                    <p className="version-content">{item.content}</p>
                                </ListItem>
                            )
                        )
                    }
                </List>
            </div>
        );
    }

}