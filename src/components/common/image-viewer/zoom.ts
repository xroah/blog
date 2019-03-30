function calcScale(img: HTMLImageElement, wrapper: HTMLElement, fit: boolean = true) {
    let imgWidth = img.naturalWidth;
    let imgHeight = img.naturalHeight;
    let wScale = imgWidth / wrapper.offsetWidth;
    let hScale = imgHeight / wrapper.offsetHeight;
    let imgScale = 1;
    if (fit) {
        if (wScale > 1 && hScale > 1) {
            if (wScale > hScale) {
                imgScale = wScale;
            } else {
                imgScale = hScale;
            }
        } else {
            imgScale = wScale > 1 ? wScale : hScale > 1 ? hScale : 1;
        }
    }
    img.width = imgWidth / imgScale;
    img.height = imgHeight / imgScale;
}

function zoom(img: HTMLImageElement, ratio: number, baseX?: number, baseY?: number) {
    let style = getComputedStyle(img);
    let origW = img.width;
    let origH = img.height;
    baseX = baseX || origW / 2;
    baseY = baseY || origH / 2;
    let l = parseFloat(style.getPropertyValue("left")) + baseX - baseX * ratio;
    let t = parseFloat(style.getPropertyValue("top")) + baseY - baseY * ratio;
    img.width *= ratio;
    img.height *= ratio;
    img.style.left = `${l}px`;
    img.style.top = `${t}px`;
}

function zoomIn(img: HTMLImageElement, baseX?: number, baseY?: number) {
    if (img.width / img.naturalWidth > 20) return;
    zoom(img, 1.1, baseX, baseY);
}

function zoomOut(img: HTMLImageElement, baseX?: number, baseY?: number) {
    if (img.naturalWidth / img.width > 20) return;
    zoom(img, .91, baseX, baseY);
}

function center(wrapper: HTMLElement, img: HTMLImageElement) {
    let left = (wrapper.offsetWidth - img.width) / 2;
    let top = (wrapper.offsetHeight - img.height) / 2;
    img.style.left = `${left}px`;
    img.style.top = `${top}px`;
}

export {
    zoom,
    zoomIn,
    zoomOut,
    calcScale,
    center
}