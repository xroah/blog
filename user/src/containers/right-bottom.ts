import {connect} from "react-redux";
import RightBottom from "../components/right-bottom";
import { UPDATE_TO_TOP_VISIBILITY, UPDATE_FEEDBACK_VISIBILITY } from "../actions";

export default connect(
    (state: any) => ({
        toTopVisible: state.rightBottom.toTopVisible
    }),
    dispatch => ({
        updateToTopVisibility(visible: boolean) {
            dispatch({
                type: UPDATE_TO_TOP_VISIBILITY,
                visible
            });
        },
        showFeedback() {
            dispatch({
                type: UPDATE_FEEDBACK_VISIBILITY,
                visible: true
            });
        }
    })
)(RightBottom);