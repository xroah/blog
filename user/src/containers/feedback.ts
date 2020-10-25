import { connect } from "react-redux";
import Feedback from "../components/feedback";
import {
    UPDATE_FEEDBACK_VISIBILITY,
    updateFeedbackLoading
} from "../actions";

export default connect(
    (state: any) => ({
        visible: state.rightBottom.feedbackVisible,
        loading: state.rightBottom.loading
    }),
    dispatch => ({
        hideFeedback() {
            dispatch({
                type: UPDATE_FEEDBACK_VISIBILITY,
                visible: false
            })
        },
        updateLoading(loading: boolean) {
            dispatch(updateFeedbackLoading(loading));
        }
    })
)(Feedback);