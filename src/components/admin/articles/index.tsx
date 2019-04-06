import * as React from "react";
import ArticleCard from "@containers/admin/article-card";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { RouteComponentProps } from "react-router-dom";
import ArticleDetails from "@containers/admin/articles-details";
import Pagination from "@common/pagination";
import NoArticle from "@common/no-article";
import "./index.scss";

interface Props extends RouteComponentProps {
    total?: number;
    list?: Array<any>;
    page?: number;
    started?: boolean;
    updatePage?: (page: number) => any;
    fetchArticle?: (page?: number) => void;
    emptyArticle?: () => any;
}

export default class Articles extends React.Component<Props> {

    state = {
        fetched: false
    };

    componentDidMount() {
        document.title = "文章管理";
    }

    static getDerivedStateFromProps(props: Props, state) {
        let {
            location: {search},
            page,
            list,
            fetchArticle,
            updatePage,
            emptyArticle
        } = props;
        search = search.substring(1);
        let _page = parseInt(search.split("=")[1]) || 1;
        //empty the articles, and update the page
        //when getDerivedStateFromProps was called next time
        //the page will equal to _page and list is empty
        //state.fetched: prevent from keeping fetching from the server when no article
        if (page !== _page) {
            state.fetched = false;
            emptyArticle();
            updatePage(_page);
        } else if (!list.length && !state.fetched) {
            fetchArticle(page);
            state.fetched = true;
        }
        return state;
    }

    toAdd = () => {
        this.props.history.push("/xsys/article/edit");
    }

    handlePageChange = (page: number) => {
        this.props.history.push(`/xsys/articles?page=${page}`);
    }

    renderArticles() {
        let {
            list = []
        } = this.props;
        return list.map((a, i) => {
            return (
                <ArticleCard
                    key={a._id}
                    id={a._id}
                    viewPath="/xsys/articles"
                    article={a}
                    isAdmin={true}
                    timeout={50 + i * 50} />
            );
        });
    }

    render() {
        let {
            total,
            page,
            started,
            list
        } = this.props;
        return (
            <section className="admin-article-list">
                {
                    list.length ?
                        (
                            <>

                                <div className="article-list-wrapper">
                                    {this.renderArticles()}

                                </div>
                                <Pagination
                                    align="right"
                                    onPageChange={this.handlePageChange}
                                    current={page}
                                    total={total} />
                            </>
                        ) :
                        !started ?
                            <NoArticle message="无记录!" img="noResult" />
                            : null
                }
                <ArticleDetails />
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