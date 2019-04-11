import ImageProperty from "@common/album-image/property";
import { connect } from "react-redux";
import { HIDE_IMAGE_PROPERTY } from "@redux/actions";

export default connect(
    (state: any) => ({
        visible: state.albumImage.propertyVisible,
        image: state.imageContextMenu.curImage
    }),
    dispatch => ({
        hideProperty() {
            dispatch({
                ...HIDE_IMAGE_PROPERTY
            });
        }
    })
)(ImageProperty);