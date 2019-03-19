import * as React from "react";
import ArticleCard from "@containers/admin/article-card";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { RouteComponentProps } from "react-router-dom";
import ArticleDetails from "@containers/admin/articles-details";
import Pagination from "@common/pagination";
import "./index.scss";

interface Props extends RouteComponentProps {
    total?: number;
    list?: Array<any>;
    page?: number;
    updatePage?: (page: number) => any;
    fetchArticle?: (page?: number) => void;
    emptyArticle?: () => any;
}

export default class Articles extends React.Component<Props> {

    state = {};

    static getDerivedStateFromProps(props: Props, state) {
        let {
            match: { params },
            page,
            list,
            fetchArticle,
            updatePage,
            emptyArticle
        } = props;
        let _page = Number((params as any).page) || 1;
        //empty the articles, and update page
        //when getDerivedStateFromProps called next time
        //the page will equal to _page and list is empty
        if (page !== _page) {
            emptyArticle();
            updatePage(_page);
        } else if (!list.length) {
            fetchArticle(page);
        }
        return state;
    }

    toAdd = () => {
        this.props.history.push("/xsys/article/edit");
    }

    handlePageChange = (page: number) => {
        this.props.history.push(`/xsys/articles/${page}`);
    }

    renderArticles() {
        let { list = [] } = this.props;
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
        let {
            total,
            page
        } = this.props;
        return (
            <section className="admin-article-list">
                <div className="article-list-wrapper">
                    {this.renderArticles()}
                </div>
                <ArticleDetails />
                <Button
                    onClick={this.toAdd}
                    className="add-right-bottom"
                    variant="contained"
                    color="primary">
                    <Add fontSize="large" />
                </Button>
                <Pagination
                    align="right"
                    onPageChange={this.handlePageChange}
                    current={page}
                    total={total} />
            </section>
        );
    }
}