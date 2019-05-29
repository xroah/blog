import * as React from "react";
import _fetch from "@common/fetch";
import { SAVE_TO_DRAFTS } from "@common/api";
import { loading } from "@common/loading";
import ArticleCard from "@containers/admin/article-card";

interface Props {
    list?: any[];
    started?: boolean;
    fetchDrafts?: () => void;
}

export default class Draft extends React.Component<Props> {
    async componentDidMount() {
        this.props.fetchDrafts();
    }

    render() {
        let {
            list,
            started
        } = this.props;
        return (
            <div className="admin-article-list">
                {
                    !started && !list.length && <div className="text-center">无记录</div>
                }
                {
                    list.map((item: any, i: number) => {
                        return (
                            <ArticleCard
                                key={item._id}
                                id={item._id}
                                viewPath="/xsys/article"
                                article={item}
                                isAdmin={true}
                                timeout={50 + i * 50}
                                isDraft={true} />
                        );
                    })
                }
            </div>
        );
    }
}