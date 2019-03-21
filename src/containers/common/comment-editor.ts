import { connect } from "react-redux";
import CommentEditor from "@common/comment-editor";
import { SAVE_ARTICLE_COMMENTS_START } from "@redux/actions";

export default connect(
    (state: any) => ({}),
    (dispatch, ownProps: any) => ({
        saveComment(body: any, success: Function, error: Function) {
            dispatch({
                ...SAVE_ARTICLE_COMMENTS_START,
                articleId: ownProps.articleId,
                body,
                success,
                error
            });
        }
    })
)(CommentEditor);