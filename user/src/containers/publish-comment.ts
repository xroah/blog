import { connect } from "react-redux";
import PublishComment from "../components/publish-comment";
import { PUBLISH_COMMENT } from "../actions";

export default connect(
    null,
    dispatch => ({
        publish(
            data: any,
            onSuccess: () => void,
            onFail: (error: any) => void
        ) {
            dispatch({
                type: PUBLISH_COMMENT,
                payload: {
                    data,
                    onSuccess,
                    onFail
                }
            });
        }
    })
)(PublishComment);