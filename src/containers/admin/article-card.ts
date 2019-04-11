import ArticleCard from "@common/article-card";
import { connect } from "react-redux";
import { 
    SHOW_ARTICLE_DETAILS,
    DELETE_ARTICLE_START
 } from "@redux/actions";

export default connect(
    (state: any) => ({}),
    (dispatch, ownProps: any) => ({
        showDetails() {
            dispatch({
                type: SHOW_ARTICLE_DETAILS.type,
                article: ownProps.article
            });
        },
        delArticle(id) {
            dispatch({
                ...DELETE_ARTICLE_START,
                id
            })
        }
    })
)(ArticleCard);