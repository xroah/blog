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

//baseX, baseY is relative to the image top left
//zoom in/out based on the image center then move the point back to original position
function zoom(img: HTMLImageElement, ratio: number, baseX?: number, baseY?: number) {
    let style = getComputedStyle(img);
    let origW = parseFloat(style.getPropertyValue("width"));
    let origH = parseFloat(style.getPropertyValue("height"));
    let l = parseFloat(style.getPropertyValue("left"));
    let t = parseFloat(style.getPropertyValue("top"))
    baseX = baseX || origW / 2;
    baseY = baseY || origH / 2;
    l += baseX - baseX * ratio;
    t += baseY - baseY * ratio;
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

//zoom in out based on center
function center(wrapper: HTMLElement, img: HTMLImageElement) {
    let style = getComputedStyle(img);
    let w = parseFloat(style.getPropertyValue("width"));
    let h = parseFloat(style.getPropertyValue("height"));
    let left = (wrapper.offsetWidth - w) / 2;
    let top = (wrapper.offsetHeight - h) / 2;
    img.style.left = `${left}px`;
    img.style.top = `${top}px`;
}

function calcDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

//pinch to zoom in/out, get the middle coordinate between the tow points
function getMiddlePos(img: HTMLImageElement, x1: number, y1: number, x2: number, y2: number) {
    let rect = img.getBoundingClientRect();
    let midX = Math.abs(x1 - x2) / 2;
    let midY = Math.abs(y1 - y2) / 2;
    if (x1 > x2) {
        midX += x2;
    } else {
        midX += x1;
    }
    if (y1 > y2) {
        midY += y2;
    } else {
        midY += y1;
    }
    return {
        midX: midX - rect.left,
        midY: midY - rect.top
    };
}

export {
    zoom,
    zoomIn,
    zoomOut,
    calcScale,
    center,
    calcDistance,
    getMiddlePos
}