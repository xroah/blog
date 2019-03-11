import * as React from "react";
import ArticleCard from "../../../containers/article-card";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import "./index.scss";

interface Props {
    details?: any;
    articles?: Array<any>;
    fetchArticle?: () => void;
}

export default class Articles extends React.Component<Props> {

    async componentDidMount() {
        this.props.fetchArticle();
    }

    renderArticles() {
        let { articles = { list: [] } } = this.props as any;
        return articles.list.map((a, i) => {
            return (
                <ArticleCard
                    key={a._id}
                    isAdmin={true}
                    title={a.title}
                    createTime={a.createTime}
                    index={i}
                    tags={a.tags}>
                    {a.summary}
                </ArticleCard>
            );
        });
    }

    render() {
        return (
            <section className="admin-article-list">
                文章列表
                <div className="article-list-wrapper">
                    {this.renderArticles()}
                </div>
                <Button className="add-right-bottom" variant="contained" color="primary">
                    <Add fontSize="large" />
                </Button>
            </section>
        );
    }
}