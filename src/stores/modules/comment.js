import fetch from "../../components/common/fetch";
import { SAVE_COMMENT } from "../../components/common/api";

const comment = {
    state: {
        editorRef: null,
        replyTo: null,
        visible: false, //is user loged in, if do not log in, user must input user info manually
        content: "",
    },
    mutations: {
        updateComment(state, payload) {
            state.editorRef = payload.editorRef;
            state.replyTo = payload.replyTo;
            state.content = payload.content;
        },
        updateVisibility(state, visible) {
            state.visible = visible;
        }
    },
    actions: {
        async saveComment({ commit, state }, payload) {
            let { content, replyTo } = state;
            let { articleId, userInfo } = payload;
            try {
                await fetch(`${SAVE_COMMENT}/${articleId}`, {
                    method: "post",
                    body: {
                        content,
                        replyTo, 
                        userInfo
                    }
                });
            } catch (error) {
                error.needInfo && commit("updateVisibility", true);
            }
        }
    }
};

export default comment;