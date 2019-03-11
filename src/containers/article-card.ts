import ArticleCard, {Props as acProps} from "@common/article-card";
import { connect } from "react-redux";
import { SHOW_ARTICLE_DETAILS } from "../redux/actions";
 
export default connect(
    (state: any) => ({}),
    (dispatch, ownProps: acProps) => {
        return {
            showDetails() {
                dispatch({
                    type: SHOW_ARTICLE_DETAILS.type,
                    index: ownProps.index || 0
                });
            }
        }
    }
)(ArticleCard);