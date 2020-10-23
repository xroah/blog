import needle from "needle"
import {ArticleState} from "../src/reducers/article"

const API_URL = "http://localhost:8000/api"

export function fetchArticles() {
    return new Promise(resolve => {
        const handleError = () => {
            const state: ArticleState = {
                list: [],
                error: true,
                loading: false,
                page: 1,
                totalPages: 1
            }

            resolve({
                article: state
            })
        }
        needle("get", `${API_URL}/articles?page=1`)
            .then(res => {
                const ret = res.body as any
                
                if (ret.code === 0) {
                    const data = ret.data
                    const totalPages = Math.ceil(data.total / 10)
                    const state: ArticleState = {
                        list: data.list,
                        page: 1,
                        error: false,
                        loading: false,
                        totalPages
                    }

                    resolve({
                        article: state
                    })
                } else {
                    handleError()
                }
            })
            .catch(handleError)
    })
}