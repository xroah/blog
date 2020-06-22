import { UPLOAD_IMAGE } from "../api.js";
import message from "../message.js";

export default function upload(file, onProgress) {
    const fd = new FormData();
    const token = localStorage.getItem("token");

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.responseType = "json";
        xhr.onreadystatechange = () => {
            const res = xhr.response || {};

            if (xhr.readyState === 4) {
                if (xhr.status === 200 && res.code === 0) {
                    resolve(res.data.url);
                    message.success("上传成功");
                } else {
                    reject(res.msg || xhr.statusText);
                }
            }
        }
        xhr.onerror = xhr.ontimeout = () => reject(xhr.statusText);
        xhr.upload.onprogress = evt => {
            const total = evt.total;
            const loaded = evt.loaded;
            const progress = (loaded / total) * 100;

            onProgress(progress);
        }

        fd.append("articleImage", file);

        xhr.open("POST", UPLOAD_IMAGE, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Authorization", `token ${token}`);
        xhr.send(fd);
    });
}