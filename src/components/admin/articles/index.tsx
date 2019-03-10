import * as React from "react";
import ArticleCard from "@common/article-card";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { FETCH_ARTICLES } from "@common/api";
import "./index.scss";

export default class Articles extends React.Component {

    async componentDidMount() {

    }



    render() {
        return (
            <section className="admin-article-list">
                文章列表
                <div className="article-list-wrapper">
                    <ArticleCard
                        isAdmin={true}
                        title="javascript水力发电"
                        createTime={new Date().toString()}
                        tags={["Javascript", "Nodejs", "Express"]}>
                        收到了飞机上的快乐飞老师的风景老师的积分老师的就发了多少块就拉上几分拉速度快解放拉萨的发顺丰
                    </ArticleCard>
                </div>
                <Button className="add-right-bottom" variant="contained" color="primary">
                    <Add fontSize="large"/>
                </Button>
            </section>
        );
    }
}