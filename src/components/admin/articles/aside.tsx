import * as React from "react";
import {
    List,
    ListItem
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import _fetch from "@common/fetch";
import { FETCH_ARTICLE_COUNT } from "@common/api";

export default class Aside extends React.Component {

    state = {
        published: 0,
        drafts: 0
    };

    async componentDidMount() {
        try {
            let ret: any = await _fetch(FETCH_ARTICLE_COUNT);
            this.setState({
                published: ret.published,
                drafts: ret.draft
            });
        } catch (err) {

        }
    }

    render() {
        let {
            published,
            drafts
        } = this.state;
        return (
            <aside className="article-nav">
                <List>
                    <ListItem>
                        <NavLink to="/xsys/articles" exact className="nav-link">
                            已发布({published || 0})
                        </NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/xsys/articles/drafts" exact className="nav-link">
                            草稿箱({drafts || 0})
                        </NavLink>
                    </ListItem>
                </List>
            </aside>
        );
    }
}