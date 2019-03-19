import * as React from "react";
import { RouteComponentProps } from "react-router";
import { formatDate } from "@common/util";
import NotExists from "../no-article";
import "./index.scss";

interface Props extends RouteComponentProps {
    started?: boolean;
    article?: any;
    fetchArticle?: (id: string) => any;
}

export default class ViewArticle extends React.Component<Props> {

    componentDidMount() {
        let {
            match: { params },
            fetchArticle
        } = this.props as any;
        if (params.id) {
            fetchArticle(params.id);
        }
    }

    render() {
        let { 
            article,
            started
         } = this.props;
        return (
            <section className="view-article-wrapper">
                {
                    started ? null : article ?
                        (
                            <>
                                <h2 className="text-center article-title">{article.title}</h2>
                                <div className="text-center other-info">
                                    <span>日期:{formatDate(article.createTime, "YYYY-MM-DD hh:mm")}</span>
                                    <span>所属分类:{article.clsName}</span>
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                    className="article-content" />
                            </>
                        )
                        : <NotExists message="文章不存在或被博主删除" />
                }
            </section>
        );
    }
}