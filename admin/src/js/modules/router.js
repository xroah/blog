import { match, pathToRegexp } from "./path-to-regexp.js";
import { cleanPath } from "./utils/path.js";
import getUrlParams from "./utils/getUrlParams.js"

export const PATH_CHANGE = "patchchange";

export default class Router {
    constructor(routes, routerView) {
        this.routes = routes;
        this.routeMap = new Map();
        this.handleHistoryChange = this.handleHistoryChange.bind(this);
        this.routerView = routerView;
        this.url = "/";

        Object.defineProperty(window, "__router__", {
            value: this
        });
    }

    createRouteMap() {
        const routes = this.routes;

        if (!routes || !routes.length) {
            return;
        }

        routes.forEach(r => {
            this.routeMap.set(r.path, r);
        });
    }

    handleHistoryChange() {
        this.to(location.pathname + location.search, true);
    }

    init() {
        this.createRouteMap();
        this.to(location.pathname + location.search);
        window.addEventListener("popstate", this.handleHistoryChange);
    }

    go(n) {
        history.go(n);
    }

    back() {
        history.back();
    }

    forward() {
        history.forward();
    }

    push(url) {
        if (this.url === url) return;

        history.pushState({}, "", url);

        this.to(url);
    }

    updateQuery(url) {
        let query = url.split("?")[1];
        const queryObj = {};
        this.query = queryObj;

        if (query) {
            query = query.split("&");

            for (let q of query) {
                let tmp = q.split("=");

                queryObj[tmp[0]] = tmp[1];
            }
        }
    }

    to(url) {
        url = cleanPath(url);

        this.url = url;
        this.update(url);
    }

    update(url) {
        let nextComp = "";
        const _url = url.split(/\?|#/)[0];
        const reg = pathToRegexp(_url);
        const current = this.routerView.current;

        for (let [k, v] of this.routeMap.entries()) {
            if (reg.test(k)) {
                nextComp = v;
                break;
            }
        }
        if (nextComp) {
            const m = match(nextComp.path);
            this.match = m(url) || {};
            this.query = getUrlParams(null, url.split("?")[1]);

            if (current) {
                if (current.tagName.toLowerCase() === nextComp.name) {
                    current.onUpdate && current.onUpdate();

                    return;
                }

                this.routerView.unmount();
            }

            document.body.dispatchEvent(new CustomEvent(PATH_CHANGE));
            this.routerView.mount(nextComp);
        } else {
            this.routerView.unmount(current);
        }
    }
}