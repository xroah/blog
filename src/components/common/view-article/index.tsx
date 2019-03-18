import * as React from "react";
import { RouteComponentProps } from "react-router";
import { formatDate } from "@common/util";
import "./index.scss";

interface Props extends RouteComponentProps {
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
        let { article } = this.props;
        return (
            <section className="view-article-wrapper">
                {
                    article ?
                        (
                            <>
                                <h2 className="text-center article-title">{article.title}</h2>
                                <div className="text-center other-info">
                                    <span>日期:{formatDate(new Date(article.createTime))}</span>
                                    <span>所属分类:{article.clsName}</span>
                                </div>
                                <div 
                                dangerouslySetInnerHTML={{__html: article.content}}
                                className="article-content"></div>
                            </>
                        )
                        : null
                }
            </section>
        );
    }
}