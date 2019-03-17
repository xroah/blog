import Articles from "@components/admin/articles";
import { FETCH_ARTICLES_START } from "@redux/actions";
import { connect } from "react-redux";

export default connect(
    (state: any) => ({
        list: state.article.list
    }),
    {
        fetchArticle() {
            return {
                ...FETCH_ARTICLES_START
            };
        }
    }
)(Articles);