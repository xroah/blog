import Articles from "../components/admin/articles";
import { FETCH_ARTICLES_START } from "@redux/actions";
import { connect } from "react-redux";

export default connect(
    (state: any) => ({
        articles: state.article.articles
    }),
    {
        fetchArticle() {
            return {
                type: FETCH_ARTICLES_START.type
            };
        }
    }
)(Articles);