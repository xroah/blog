import fetch from "../../components/common/fetch";

const comment = {
    editorRef: null, 
    replyTo: null,  
    visible: false, //reply other user's comment editor visible
    content: "", 
    hasInfo: true, //is user loged in, if do not log in, user must input user info manually
    mutations: {
        updateRef(state, payload) {
            state.editorRef = payload.editorRef;
            state.replyTo = payload.replyTo;
        },
        updateVisibility(state, visible) {
            state.visible = visible;
        },
        updateContent(state, content) {
            state.content = content;
        }
    },
    actions: {
        saveComment({ commit }, payload) {

        }
    }
};