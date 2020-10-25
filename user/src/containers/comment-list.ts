import { connect } from "react-redux";
import CommentList from "../components/comment-list";
import { WATCH_FETCH_COMMENT_LIST } from "../actions";

export default connect(
    (state: any) => ({
        list: state.comment.list,
        error: state.comment.error,
        loading: state.comment.loading
    }),
    dispatch => ({
        fetchComments(articleId: string) {
            dispatch({
                type: WATCH_FETCH_COMMENT_LIST,
                payload: {
                    refresh: true,
                    articleId
                }
            })
        }
    })
)(CommentList);