export default function request(url, options = {}) {
    const defaultOptions = {
        method: "GET",
        mode: "same-origin",
        credentials: "same-origin"
    };
    const _options = {
        ...defaultOptions,
        ...options
    };
    const method = _options.method.toLowerCase();
    const set = new Set(["post", "put", "patch"]);
    let headers = _options.headers;

    if (!headers) {
        headers = _options.headers = new Headers();
    } 

    headers.append("X-Requested-With", "XMLHttpRequest");

    if (set.has(method)) {
        headers.append("Content-Type", "application/json; charset=utf-8");
    }

    return new Promise((resolve, reject) => {
        fetch(url, _options)
            .then(res => {
                res.json()
                    .then(ret => {
                        if (res.ok && ret.code === 0) {
                            return resolve(ret.data);
                        }

                        reject(ret);
                    })
                    .catch(reject);
            }).catch(err => reject(err));
    });
}