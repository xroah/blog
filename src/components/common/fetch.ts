import message from "./message";
import { autoLogin } from "./login";

let supportFetch = "fetch" in window && typeof fetch === "function";

interface FetchOptions {
    method: string,
    headers?: Object,
    body?: string | FormData,
    mode?: "cors" | "no-cors" | "same-origin",
    credentials?: "omit" | "same-origin" | "include",
    cache?: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-=cached",
    redirect?: "follow" | "error" | "manual",
    referer?: string
}

const DEFAULT_CONFIG: FetchOptions = {
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit, just for send cookie
    method: "get",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded"
    }
};

function isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}

function errorAlert(err: any = {}) {
    message.error(
        err.errMsg // error message from server
        ||
        err.statusText //network error
        ||
        err.message //other javascript error
        ||
        "未知错误",
        1500
    );
}

function polyfill(url: string, config = {}) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let conf: any = {
            ...DEFAULT_CONFIG,
            ...config
        }
        setXhrFlag(conf);
        let {
            headers = {},
            method,
            body
        } = conf;

        if (method === "get" || method === "header") {
            if (body) {
                throw new Error("get或head请求不能设置body");
            }
        }
        method = method.toLowerCase();
        xhr.onload = () => {
            let res = JSON.parse(xhr.responseText);
            if (res.errCode === 0) {
                resolve(res.data);
            } else {
                reject(res);
                errorAlert(res);
            }
        }
        xhr.onerror = () => {
            reject(xhr);
            errorAlert(xhr);
        }
        xhr.open(method, url, true);
        if (isObject(body)) {
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(body);
        }
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
        xhr.send(body);
    });
}

function setXhrFlag(conf) {
    let {
        headers = {}
    } = conf;
    if (!headers["X-Requested-With"]) {
        headers["X-Requested-With"] = "XMLHttpRequest";
    }
}

function _fetch(url: string, config?: Object) {
    let conf: any = {
        ...DEFAULT_CONFIG,
        ...config
    };
    setXhrFlag(conf);
    if (isObject(conf.body)) {
        conf.body = JSON.stringify(conf.body);
        conf.headers["Content-Type"] = "application/json";
    } else if (conf.body instanceof FormData) {
        //delete the default content type, the browser will set it automatically
        //if set manually, the multer midlleware will throw "Boundary not found"
        delete conf.headers["Content-Type"];
    }
    return new Promise((resolve, reject) => {
        fetch(url, conf).then(async response => {
            /**
             * The Promise returned from fetch() won’t reject on HTTP error status
             * even if the response is an HTTP 404 or 500. 
             * Instead, it will resolve normally (with ok status set to false), 
             * and it will only reject on network failure or 
             * if anything prevented the request from completing.
             */
            if (response.ok) {
                let res = await response.json();
                if (res.errCode === 0) {
                    resolve(res.data);
                } else if (res.errCode === 403) {
                    message.info("正在登录...", 3000);
                    autoLogin(
                        () => location.reload(),
                        () => setTimeout(() => location.assign("/xsys/login"), 1500)
                        );
                } else {
                    reject(res.data);
                    errorAlert(res);
                }
                return;
            }
            reject(response);
            errorAlert(response);
        }).catch(err => {
            errorAlert(err);
            //catch other error
            if (err instanceof Error) {
                console.error(err);
                return;
            }
            reject(err);
        });
    });
}

export default (supportFetch ? _fetch : polyfill);