import React from "react";
import ArticleCard from "./article-card";
import Spinner from "reap-ui/lib/Spinner";
import throttle from "reap-ui/lib/utils/throttle";

interface Props {
    page: number,
    list: any[];
    totalPages: number;
    error: boolean;
    loading: boolean;
    fetchArticles: (page: number, category?: string) => void;
}

export default class HomePage extends React.Component<Props> {

    constructor(props: Props) {
        super(props);

        this.handleScroll = throttle(this.handleScroll.bind(this));
    }

    componentDidMount() {
        const {
            page,
            fetchArticles,
            list
        } = this.props;

        !list.length && fetchArticles(page);
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        const {
            page,
            totalPages,
            error,
            loading,
            fetchArticles
        } = this.props;

        if (error || page >= totalPages || loading) return;

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const THRESHOLD = 100;
        const bottom = document.body.scrollHeight - window.innerHeight - scrollTop;

        if (bottom <= THRESHOLD) {
            fetchArticles(page + 1);
        }
    }

    renderArticles() {
        const { list } = this.props;

        return list.map((article: any) => (
            <ArticleCard
                key={article._id}
                articleId={article._id}
                title={article.title}
                time={article.createTime}
                viewed={article.totalViewed}
                tag={article.tag}
                comments={article.commentCount || 0}>
                {article.summary}
            </ArticleCard>
        ));
    }

    render() {
        const {
            loading,
            page,
            totalPages
        } = this.props;
        const hasMore = page < totalPages;
        
        return (
            <div style={{ paddingBottom: 15 }}>
                {
                    loading && (
                        <div className="d-flex justify-content-center">
                            <Spinner variant="info" animation="grow" />
                        </div>
                    )
                }
                {this.renderArticles()}
                {
                    !hasMore && !loading && (
                        <div className="text-center text-muted mt-3">
                            没有更多了
                        </div>
                    )
                }
            </div>
        )
    }
}
