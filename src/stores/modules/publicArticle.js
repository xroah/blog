import { artticleState } from "../state";
import { updateArticle } from "../mutations";
import { fetchAricle, FETCH_PUBLIC_ARTICLE } from "../actions";
import { PUBLIC_ARTICLE } from "../../components/common/api";

const article = {
    state: {
        ...artticleState
    },
    mutations: {
        ...updateArticle
    },
    actions: {
        ...fetchAricle(FETCH_PUBLIC_ARTICLE, PUBLIC_ARTICLE)
    }
};

export default article;