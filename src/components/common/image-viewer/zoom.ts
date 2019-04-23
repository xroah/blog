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

function getImageSize(img: HTMLImageElement) {
    let style = getComputedStyle(img);
    let width = parseFloat(style.getPropertyValue("width"));
    let height = parseFloat(style.getPropertyValue("height"));
    let left = parseFloat(style.getPropertyValue("left"));
    let top = parseFloat(style.getPropertyValue("top"));
    return {
        width,
        height,
        left,
        top
    };
}

//baseX, baseY is relative to the image top left
//zoom in/out based on the image center then move the point back to original position
function zoom(img: HTMLImageElement, ratio: number, baseX?: number | null, baseY?: number | null) {
    let {
        left,
        width,
        top,
        height
    } = getImageSize(img);
    baseX = baseX == null ? width / 2 : baseX;
    baseY = baseY == null ? height / 2 : baseY;
    left += baseX - baseX * ratio;
    top += baseY - baseY * ratio;
    width *= ratio;
    height *= ratio;
    img.style.cssText = `
        width: ${width}px;
        height: ${height}px;
        left: ${left}px;
        top: ${top}px;
    `;
}

function handleTouchZoomOut(img: HTMLImageElement, ratio: number) {
    zoom(img, ratio);
    let {
        left,
        top
    } = getImageSize(img);
    const rect = img.getBoundingClientRect();
    if (top >= 0 && rect.bottom <= window.innerHeight) {
        top = (window.innerHeight - rect.height) / 2;
    } else if (top > 0 && rect.height > window.innerHeight) {
        top = 0;
    } else if (top < 0 && rect.height - Math.abs(top) < window.innerHeight) {
        top = window.innerHeight - rect.height;
    }

    if (left >= 0 && rect.right <= window.innerWidth) {
        left = (window.innerWidth - rect.width) / 2;
    } else if (left > 0 && rect.width > window.innerWidth) {
        left = 0;
    } else if (left < 0 && rect.width - Math.abs(left) < window.innerWidth) {
        left = window.innerWidth - rect.width;
    }

    img.style.left = `${left}px`;
    img.style.top = `${top}px`;
}

function handleEdge(img: HTMLImageElement, left: number, top: number, disX: number, disY: number) {
    const rect = img.getBoundingClientRect();
    let _left = left + disX;
    let _top = top + disY;
    if ( rect.top > 0 && rect.bottom < window.innerHeight) {
        _top = top;
    } else if (disY > 0 && _top >= 0) {
        _top = 0;
    } else if (disY < 0 && rect.height - Math.abs(_top) <= window.innerHeight) {
        _top = window.innerHeight - rect.height;
    }
    if (rect.left > 0 && rect.right < window.innerWidth) {
        _left = left;
    } else if (disX > 0 && _left >= 0) {
        _left = 0;
    } else if (disX < 0 && rect.width - Math.abs(_left) <= window.innerWidth) {
        _left = window.innerWidth - rect.width;
    }
    img.style.left = `${_left}px`;
    img.style.top = `${_top}px`;
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

//center image
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
    getMiddlePos,
    getImageSize,
    handleEdge,
    handleTouchZoomOut
}