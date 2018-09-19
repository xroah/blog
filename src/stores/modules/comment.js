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
        async saveComment({ commit, state }, articleId) {
            console.log(state)
            let { content, replyTo } = state;
            try {
                await fetch(`${SAVE_COMMENT}/${articleId}`, {
                    method: "post",
                    body: {
                        content,
                        replyTo
                    }
                });
            } catch (error) {
                error.needInfo && commit("updateVisibility", true);
            }
        }
    }
};

export default comment;