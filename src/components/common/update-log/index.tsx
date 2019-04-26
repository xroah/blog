import * as React from "react";
import {
    List,
    ListItem,
    Typography
} from "@material-ui/core";
import { FETCH_VERSION } from "@common/api";
import _fetch from "@common/fetch";
import { formatDate } from "@common/util";
import InlineLoading from "@common/inline-loading";
import "./index.scss";

export default class UpdateLog extends React.Component {

    state = {
        list: [],
        loading: false
    };

    componentDidMount() {
        this.fetchVersion();
    }

    fetchVersion = async () => {
        this.setState({
            loading: true
        });
        try {
            let ret = await _fetch(FETCH_VERSION);
            this.setState({
                list: ret
            });
        } catch (err) {

        }
        this.setState({
            loading: false
        });
    }

    render() {
        const { 
            list,
            loading
         } = this.state;

        return (
            <div className="update-log-container">
                <Typography variant="h6">更新日志:</Typography>
                {
                    loading && <InlineLoading />
                }
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