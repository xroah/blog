import "../layer.js";
import message from "../message.js";

const ID = "imgViewerLayer";

let layer = document.getElementById(ID);

if (!layer) {
    layer = document.createElement("layer-comp");
    layer.id = ID;

    layer.innerHTML = `
        <img id="coverPreview" class="d-none">
        <div id="spinner" class="spinner-border d-none text-primary"></div>
    `;

    document.body.appendChild(layer);
}

export default function viewImage(url) {
    const spinner = document.getElementById("spinner");
    const img = document.getElementById("coverPreview");
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    img.classList.add("d-none");
    spinner.classList.remove("d-none");

    img.src = url;
    img.onload = () => {
        const origWidth = img.naturalWidth;
        const origHeight = img.naturalHeight;

        if (
            origWidth > winWidth ||
            origHeight > winHeight
        ) {
            const wr = origWidth / winWidth;
            const hr = origHeight / winHeight;
            
            if (wr > hr) {
                img.width = winWidth;
                img.height = origWidth / wr;
            } else {
                img.width = origWidth / hr;
                img.height = winHeight;
            }
        }

        img.classList.remove("d-none");
        spinner.classList.add("d-none");
    };
    img.onerror = () => {
        message.destroy();
        message.error("图片加载失败");
    };

    layer.setVisible(true)
}