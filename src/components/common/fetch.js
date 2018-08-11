import { resolve } from "url";

const DEFAULT_CONFIG = {
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit, just for send cookie
    method: "get",
    headers: {
        "X-Request-Width": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded"
    }
};

function isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}

export default function _fetch(url, config) {
    let conf = {...DEFAULT_CONFIG, ...config};
    if (config && config.headers) {
        conf.headers = {...DEFAULT_CONFIG.headers, ...config.headers};
    }
    if (isObject(conf.body)) {
        conf.body = JSON.stringify(conf.body);
        conf.headers["Content-Type"] = "application/json";
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
                    
                } else {
                    reject(res);
                }
                return;
            }
            reject(response);
        }).catch((err) => {
            if (err instanceof Error) {
                console.error(err);
                return;
            }
            reject();
        });
    });
} 