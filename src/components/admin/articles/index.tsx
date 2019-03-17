import * as React from "react";
import ArticleCard from "@containers/admin/article-card";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { RouteComponentProps } from "react-router-dom";
import ArticleDetails from "@containers/admin/articles-details";
import "./index.scss";

interface Props extends RouteComponentProps {
    details?: any;
    list?: Array<any>;
    fetchArticle?: () => void;
}

export default class Articles extends React.Component<Props> {

    componentDidMount() {
        this.props.fetchArticle();
    }

    toAdd = () => {
        this.props.history.push("/xsys/articles/edit");
    }

    renderArticles() {
        let { list } = this.props;
        return list.map((a, i) => {
            return (
                <ArticleCard
                    key={a._id}
                    id={a._id}
                    article={a}
                    isAdmin={true}
                    timeout={50 + i * 50}>
                    {a.summary}
                </ArticleCard>
            );
        });
    }

    render() {
        return (
            <section className="admin-article-list">
                <div className="article-list-wrapper">
                    {this.renderArticles()}
                </div>
                <ArticleDetails/>
                <Button
                    onClick={this.toAdd}
                    className="add-right-bottom"
                    variant="contained"
                    color="primary">
                    <Add fontSize="large" />
                </Button>
            </section>
        );
    }
}