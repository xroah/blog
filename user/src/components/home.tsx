import React from "react";
import ArticleCard from "./article-card";
import Spinner from "reap-ui/lib/Spinner";
import throttle from "reap-ui/lib/utils/throttle";
import getScrollTop from "../utils/get-scroll-top";
import PullRefreshMessage from "./pull-refresh-message"
import message from "./message";

const PULL_REFRESH_THRESHOLD = 50

interface Props {
    page: number,
    list: any[];
    totalPages: number;
    error: boolean;
    loading: boolean;
    pullRefreshState: string
    fetchArticles: (
        page: number,
        category?: string,
        onSuccess?: () => void,
        onError?: () => void
    ) => void;
    emptyArticle: () => void
    updatePullFreshState: (state?: string) => void
}

export default class HomePage extends React.Component<Props> {
    private touchDown = false
    private startY = 0
    private divRef = React.createRef<HTMLDivElement>()
    private wrapperRef = React.createRef<HTMLDivElement>()
    private translateY = 0
    private prevY = 0

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
        const {current} = this.wrapperRef

        if (list.length) {
            this.handleScroll();
        } else {
            fetchArticles(page, "", this.handleScroll);
        }

        window.addEventListener("scroll", this.handleScroll);

        if (current) {
            current.addEventListener("touchstart", this.handleTouchStart)
            current.addEventListener("touchmove", this.handleTouchMove, {passive: false})
            current.addEventListener("touchend", this.handleTouchEnd)
        }
    }

    componentWillUnmount() {
        const {current} = this.wrapperRef

        if (current) {
            current.removeEventListener("touchstart", this.handleTouchStart)
            current.removeEventListener("touchmove", this.handleTouchMove)
            current.removeEventListener("touchend", this.handleTouchEnd)
        }

        window.removeEventListener("scroll", this.handleScroll);
    }

    handleTouchStart = (evt: TouchEvent) => {
        if (
            evt.touches.length > 1 ||
            this.props.pullRefreshState === "refreshing"
        ) {
            return
        }

        this.touchDown = true
        this.prevY = evt.touches[0].clientY
    }

    updateTransform(dis: number) {
        const {current} = this.divRef
        const MAX = 80

        if (current) {
            if (dis > MAX) {
                dis = MAX
            }

            this.translateY = dis
            current.style.transform = `translateY(${dis}px)`
        }
    }

    handleTouchMove = (evt: TouchEvent) => {
        const sTop = getScrollTop()

        const {
            pullRefreshState,
            updatePullFreshState
        } = this.props

        if (
            !this.touchDown ||
            sTop > 0 ||
            pullRefreshState === "refreshing"
        ) {
            return
        }

        if (!this.startY) {
            this.startY = evt.touches[0].clientY
        }

        const y = evt.touches[0].clientY
        let dis = y - this.startY - sTop
        
        if (dis > 0) {

            this.updateTransform(dis)

            if (dis > PULL_REFRESH_THRESHOLD) {
                updatePullFreshState("canRefresh")
            } else {
                updatePullFreshState()
            }
        }

        //swipe down
        if (y - this.prevY > 0 && evt.cancelable) {
            evt.preventDefault()
        }
    }

    pullRefresh() {
        const {
            fetchArticles,
            emptyArticle,
            updatePullFreshState
        } = this.props;
        const done = () => {
            this.updateTransform(0)
            updatePullFreshState()
        }

        message.destroy()
        fetchArticles(
            1,
            undefined,
            () => {
                message.success("刷新成功")
                emptyArticle()
                done()
            },
            () => {
                message.error("刷新失败")
                done()
            }
        )
    }

    handleTouchEnd = () => {
        const {
            pullRefreshState,
            updatePullFreshState
        } = this.props

        if (
            !this.touchDown ||
            pullRefreshState === "refreshing"
        ) {
            return
        }

        if (this.translateY >= PULL_REFRESH_THRESHOLD) {
            updatePullFreshState("refreshing")
            this.pullRefresh()
        } else {
            updatePullFreshState()
        }

        this.updateTransform(0)

        this.touchDown = false
        this.startY = this.prevY = 0
    }

    handleScroll() {
        const {
            page,
            totalPages,
            error,
            loading,
            fetchArticles
        } = this.props;

        if (error || page >= totalPages || loading) {
            return;
        }

        const sTop = getScrollTop();
        const THRESHOLD = 100;
        const bottom = document.body.scrollHeight - window.innerHeight - sTop;

        if (bottom <= THRESHOLD) {
            fetchArticles(page + 1);
        }
    }

    renderArticles() {
        const {list} = this.props;

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
            totalPages,
            pullRefreshState
        } = this.props;
        const hasMore = page < totalPages;

        return (
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    position: "relative",
                    paddingBottom: 20,
                    overflow: "hidden"
                }}
                ref={this.wrapperRef}>
                <div ref={this.divRef}
                    style={{
                        flex: 1,
                        paddingTop: 5
                    }}>
                    <PullRefreshMessage state={pullRefreshState} />
                    {this.renderArticles()}
                    {
                        loading && pullRefreshState !== "refreshing" && (
                            <div className="d-flex mt-2 justify-content-center">
                                <Spinner variant="info" animation="grow" />
                            </div>
                        )
                    }
                    {
                        !hasMore && !loading && (
                            <div className="text-center text-muted mt-3">
                                没有更多了
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
