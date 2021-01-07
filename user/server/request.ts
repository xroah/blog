import needle from "needle"
import {ArticleState} from "../src/reducers/article"

const API_URL = "http://localhost:8000/api"

function request(url: string, params?: object) {
    const qs: string[] = []

    if (params) {
        Object.keys(params).forEach(k => {
            qs.push(`${k}=${(params as any)[k]}`)
        })
    }

    if (!url.includes("?")) {
        url = `${url}?`
    } else {
        url = `${url}&`
    }

    return needle(
        "get",
        `${API_URL}${url}${qs.join("&")}`
    )
}

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

        request("/articles", {page: 1})
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

export function fetchArticle(articleId: string) {
    return new Promise(resolve => {
        const handleError = () => {
            resolve({
                view: {
                    article: -1
                }
            })
        }

        request("/articles", {articleId})
            .then(res => {
                const ret = res.body as any

                if (ret.code === 0) {
                    resolve({
                        view: {
                            article: ret.data
                        }
                    })
                } else {
                    handleError()
                }
            })
            .catch(handleError)
    })
}