import serialize from "./serialize";
import isObject from "./is-object";
import noop from "./noop";

let token = 0;

export default class CancelToken {
    public token: number;
    static requests: Map<number, XHR> = new Map();

    constructor() {
        this.token = token++;
    }

    cancel() {
        CancelToken.cancel(this.token);
    }

    static add(xhr: XHR) {
        if (xhr.token) {
            this.requests.set(xhr.token, xhr);
        }
    }

    static remove(xhr: XHR) {
        const { requests } = this;

        if (xhr.token && requests.has(xhr.token)) {
            requests.delete(xhr.token);
        }
    }

    static cancel(token: number) {
        const { requests } = this;
        const xhr = requests.get(token);

        if (xhr) {
            xhr.cancel();
            this.remove(xhr);
        }
    }

    static cancelAll() {
        const { requests } = this;

        requests.forEach(v => v.cancel());

        this.requests = new Map();
    }
}

interface Options {
    method?: string;
    url: string;
    data: any;
    responseType?: XMLHttpRequestResponseType;
    headers: any;
    token?: number;
    withCredentials?: boolean;
    timeout?: number;
    beforeSend?: (xhr: XMLHttpRequest) => any;
    onAbort?: (evt: ProgressEvent, xhr: XMLHttpRequest) => any;
    onTimeout?: (evt: ProgressEvent, xhr: XMLHttpRequest) => any;
    onError?: (evt: ProgressEvent, xhr: XMLHttpRequest) => any;
    onComplete?: (xhr: XMLHttpRequest) => any;
    onProgress?: (evt: ProgressEvent, xhr: XMLHttpRequest) => any;
    onSuccess?: (data: any, xhr: XMLHttpRequest) => any;
}

class XHR {
    private xhr: XMLHttpRequest = new XMLHttpRequest();
    private options: Options;
    public token: number | undefined = undefined;
    public complete: boolean = false;

    constructor(options: Options) {
        this.options = options;
        this.xhr.responseType = options.responseType || "";

        if (options.withCredentials != undefined) {
            this.xhr.withCredentials = !!options.withCredentials;
        }

        if (options.timeout != undefined) {
            this.xhr.timeout = options.timeout;
        }

        if (options.token != undefined) {
            this.token = options.token;

            CancelToken.add(this);
        }
    }

    initEvents() {
        const {
            onAbort = noop,
            onComplete = noop,
            onError = noop,
            onTimeout = noop,
            onProgress = noop,
            onSuccess = noop
        } = this.options;
        const {xhr} = this;

        xhr.onreadystatechange = evt => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    onSuccess(xhr.response, xhr);
                } else {
                    onError(xhr.response, xhr);
                }
            }
        };
        xhr.onabort = evt => {
            onComplete(xhr);
            onAbort(evt, xhr);
        };
        xhr.onerror = evt => {
            onComplete(xhr);
            onError(evt, xhr);
        };
        xhr.onprogress = evt => onProgress(evt, xhr);
        xhr.ontimeout = evt => {
            onComplete(xhr);
            onTimeout(evt, xhr);
        };
    }

    request() {
        let {
            method = "GET",
            beforeSend = noop,
            headers,
            data,
            url
        } = this.options;
        method = method.toUpperCase();

        if (!isObject(headers)) {
            headers = {};
        }

        if (method === "POST" || method === "PUT") {
            if (isObject(data) ) {
                if (headers["Content-Type"].includes("application/json")) {
                    data = JSON.stringify(data);
                } else {
                    data = serialize(data);
                }
            }
        } else {
            data = serialize(data);
        }

        this.initEvents();
        this.xhr.open(method, url, true);
        beforeSend(this.xhr);
        this.xhr.send(data);
    }

    cancel() {
        if (!this.complete) {
            this.xhr.abort();
        }
    }
}