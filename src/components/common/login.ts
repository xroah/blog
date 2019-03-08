import _fetch from "./fetch";
import md5 from "blueimp-md5";
import { encrypt } from "./util";
import { ADMIN_LOGIN } from "./api";

export const SAVE_INFO_KEY = "accountInfo";

interface Callback {
    (arg: any): any;
}

export function getInfo() {
    let info = JSON.parse(localStorage.getItem(SAVE_INFO_KEY));
    if (info) {
        info.password = encrypt(atob(info.password), info.username);
        info.username = atob(info.username);
    }
    return info;
}

export function saveInfo(username: string, password: string, autoLogin: boolean) {
    username = btoa(username);
    password = btoa(encrypt(password, username));
    localStorage.setItem(SAVE_INFO_KEY, JSON.stringify({
        username,
        password,
        autoLogin
    }));
}

export function delInfo() {
    localStorage.removeItem(SAVE_INFO_KEY);
}

export default function login(username: string, password: string) {
    return _fetch(ADMIN_LOGIN, {
        method: "post",
        body: {
            username,
            password: md5(password)
        }
    });
}

export function autoLogin(callback: Callback = () => 0, errCb: Callback = () => 0) {
    let info: any = getInfo();
    if (info && info.autoLogin) {
        login(info.username, info.password)
            .then(callback)
            .catch(errCb);
    }
}

export function logOut() {
    return _fetch(ADMIN_LOGIN, {
        method: "delete"
    });
}