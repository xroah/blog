import { isFunc } from "./util";

interface Handler {
    [name: string]: Array<Function>;
}

export default class EventEmitter {
    private handlers: Handler = {};

    on(name: string, handler: Function) {
        let handlers = this.handlers[name];
        let exists = false;
        if (!isFunc(handler)) return;
        if (!handlers) {
            handlers = this.handlers[name] = [];
        }
        for (let h of handlers) {
            if (h === handler) {
                exists = true;
                break;
            }
        }
        !exists && handlers.push(handler);
    }

    off(name: string, handler?: Function) {
        let handlers = this.handlers[name];
        if (!handlers) return;
        if (handler === undefined) {
            handlers.length = 0;
        } else if (isFunc(handler)) {
            for (let i = 0, l = handlers.length; i < l; i++) {
                if (handlers[i] === handler) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        }
    }

    emit(name: string, ...args) {
        let handlers = this.handlers[name];
        if (!handlers) return;
        for (let h of handlers) {
            h(...args);
        }
    }
}