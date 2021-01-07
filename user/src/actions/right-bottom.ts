export const UPDATE_TO_TOP_VISIBILITY = "UPDATE_TO_TOP_VISIBILITY";
export const UPDATE_FEEDBACK_VISIBILITY = "UPDATE_FEEDBACK_VISIBILITY";
export const UPDATE_FEEDBACK_LOADING = "UPDATE_FEEDBACK_LOADING";

export function updateToTopVisibility(visible: boolean) {
    return {
        type: UPDATE_TO_TOP_VISIBILITY,
        visible
    };
}

export function updateFeedbackVisibility(visible: boolean) {
    return {
        type: UPDATE_FEEDBACK_VISIBILITY,
        visible
    };
}

export function updateFeedbackLoading(loading: boolean) {
    return {
        type: UPDATE_FEEDBACK_LOADING,
        loading
    };
}