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
    imgWidth /= imgScale;
    imgHeight /= imgScale;
    img.style.width = `${imgWidth}px`;
    img.style.height = `${imgHeight}px`;
}

function zoom(img: HTMLImageElement, ratio: number, baseX?: number, baseY?: number) {
    let style = getComputedStyle(img);
    let l = parseFloat(style.getPropertyValue("left")) + baseX - baseX * ratio;
    let t = parseFloat(style.getPropertyValue("top")) + baseY - baseY * ratio;
    let origW = parseFloat(style.getPropertyValue("width"));
    let origH = parseFloat(style.getPropertyValue("height"));
    baseX = baseX || origW / 2;
    baseY = baseY || origH / 2;
    origW *= ratio;
    origH *= ratio;
    img.style.cssText = `
        width: ${origW}px;
        height: ${origH}px;
        left: ${l}px;
        top: ${t}px;
    `;
}

function zoomIn(img: HTMLImageElement, baseX?: number, baseY?: number) {
    let w = parseFloat(getComputedStyle(img).getPropertyValue("width"));
    if (w / img.naturalWidth > 20) return;
    zoom(img, 1.1, baseX, baseY);
}

function zoomOut(img: HTMLImageElement, baseX?: number, baseY?: number) {
    let w = parseFloat(getComputedStyle(img).getPropertyValue("width"));
    if (img.naturalWidth / w > 20) return;
    zoom(img, .91, baseX, baseY);
}

function center(wrapper: HTMLElement, img: HTMLImageElement) {
    let style = getComputedStyle(img);
    let w = parseFloat(style.getPropertyValue("width"));
    let h = parseFloat(style.getPropertyValue("height"));
    let left = (wrapper.offsetWidth - w) / 2;
    let top = (wrapper.offsetHeight - h) / 2;
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