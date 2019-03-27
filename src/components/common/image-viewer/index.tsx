import * as React from "react";
import {
    ZoomIn,
    ZoomOut,
    RotateLeft,
    RotateRight,
    NavigateBefore,
    NavigateNext,
    Fullscreen,
    PhotoSizeSelectActual,
    CropSquare,
    SaveAlt,
    Close
} from "@material-ui/icons";
import {
    IconButton,
    Toolbar
} from "@material-ui/core";
import "./index.scss";

interface Props {
    image?: string | HTMLImageElement | null;
    imageName?: string;
}

export default class ImageViewer extends React.Component<Props> {

    timer: NodeJS.Timeout;
    image: React.RefObject<HTMLImageElement> = React.createRef();
    imgWrapper: React.RefObject<HTMLDivElement> = React.createRef();
    imageLoaded: boolean = false;
    rotateAngle: number = 0;

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        this.loadImag();
    }

    componentWillMount() {
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize = () => {
        if (this.timer != undefined) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(this.resize, 300);
    }

    //fit screen or real size
    resize = (isScale: boolean = true) => {
        let {
            imageLoaded,
            image: { current: img },
            imgWrapper: { current: wrapper },
            rotateAngle
        } = this;
        if (imageLoaded) {
            let width;
            let height;
            if (rotateAngle / 90 % 2 === 0) {
                width = window.innerWidth;
                height = window.innerHeight;
            } else {
                width = window.innerHeight;
                height = window.innerWidth;
            }
            wrapper.style.width = `${width}px`;
            wrapper.style.height = `${height}px`;
            this.calcScale(isScale);
            let left = (wrapper.offsetWidth - img.width) / 2;
            let top = (wrapper.offsetHeight - img.height) / 2;
            img.style.left = `${left}px`;
            img.style.top = `${top}px`;
        }
    }

    calcScale = (isScale: boolean = true) => {
        let {
            image: { current: img },
            imgWrapper: { current: wrapper }
        } = this;
        let imgWidth = img.naturalWidth;
        let imgHeight = img.naturalHeight;
        let wScale = imgWidth / wrapper.offsetWidth;
        let hScale = imgHeight / wrapper.offsetHeight;
        let imgScale = 1;
        if (isScale) {
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

    loadImag() {
        let { image: { current: img } } = this;
        this.imageLoaded = false;
        img.onload = () => {
            img.onload = null;
            this.imageLoaded = true;
            this.rotate(0);
        };
        img.src = "/uploads/2019/3/th.jpg";
    }

    //scale=2: scale based on the img center
    zoom = (ratio: number, baseX?: number, baseY?: number, scale: number = 2) => {
        let {
            image: { current: img }
        } = this;

        let style = getComputedStyle(img);
        let origW = baseX || img.width;
        let origH = baseY || img.height;
        let w = origW * ratio;
        let h = origH * ratio;
        let l = parseFloat(style.getPropertyValue("left")) - (w - origW) / scale;
        let t = parseFloat(style.getPropertyValue("top")) - (h - origH) / scale;
        img.width *= ratio;
        img.height *= ratio;
        img.style.left = `${l}px`;
        img.style.top = `${t}px`;
    }

    zoomIn = (baseX?: number, baseY?: number, scale?: number) => {
        let img = this.image.current;
        if (img.width / img.naturalWidth > 20) return;
        this.zoom(1.1, baseX, baseY, scale);
    }

    zoomOut = (baseX?: number, baseY?: number, scale?: number) => {
        let img = this.image.current;
        if (img.naturalWidth / img.width > 20) return;
        this.zoom(.9, baseX, baseY, scale);
    }

    handleZoomIn = () => {
        this.zoomIn();
    }

    handleZoomOut = () => {
        this.zoomOut();
    }

    //reset to real size
    reset = () => {
        this.resize(false);
    }

    rotate = (angle: number) => {
        let {
            imageLoaded,
            imgWrapper: { current: wrapper }
        } = this;
        if (!imageLoaded) return;
        this.rotateAngle = angle;
        wrapper.style.transform = `rotate(${angle}deg)`;
        this.resize();
    }

    rotateLeft = () => {
        let angle = this.rotateAngle;
        if (angle === 0) {
            angle = 270;
        } else {
            angle -= 90;
        }
        this.rotate(angle);
    }

    rotateRight = () => {
        let angle = this.rotateAngle;
        if (angle === 270) {
            angle = 0;
        } else {
            angle += 90;
        }
        this.rotate(angle);
    }

    handleMouseWheel = (evt: React.WheelEvent) => {
        let img = this.image.current;
        let dir = evt.deltaY;
        let x = evt.clientX;
        let y = evt.clientY;
        let rect = img.getBoundingClientRect();
        let angle = this.rotateAngle;
        switch (angle) {
            case 90:
                x = y - rect.top;
                y = rect.right - x;
                break;
            case 180:
                x = rect.right - x;
                y = rect.bottom - y;
                break;
            case 270:
                y = x - rect.left;
                x = rect.bottom - y;
                break;
            default:
                x = x - rect.left;
                y = y - rect.top;
        };
        if (dir < 0) {
            this.zoomIn(x, y, 1);
        } else {
            this.zoomOut(x, y, 1);
        }
    }

    download = () => {
        let a = document.createElement("a");
        let { imageName = Date.now() } = this.props;
        a.href = this.image.current.src;
        a.download = String(imageName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    handleDragStart = (evt: React.DragEvent) => {
        evt.preventDefault();
    }

    render() {
        const btns = [{
            icon: ZoomIn,
            title: "放大",
            handler: this.handleZoomIn
        }, {
            icon: ZoomOut,
            title: "缩小",
            handler: this.handleZoomOut
        }, {
            icon: PhotoSizeSelectActual,
            title: "原始大小",
            handler: this.reset
        }, {
            icon: CropSquare,
            title: "适应屏幕",
            handler: this.resize
        }, {
            icon: RotateLeft,
            title: "左旋转90度",
            handler: this.rotateLeft
        }, {
            icon: RotateRight,
            title: "右旋转90度",
            handler: this.rotateRight
        }, {
            icon: NavigateBefore,
            title: "上一张",
            handler: () => 0
        }, {
            icon: NavigateNext,
            title: "下一张",
            handler: () => 0
        }, {
            icon: SaveAlt,
            title: "下载",
            handler: this.download
        }];

        return (
            <div className="image-viewer-wrapper">
                <IconButton className="close-btn" color="inherit">
                    <Close fontSize="large" />
                </IconButton>
                <div ref={this.imgWrapper} className="img-wrapper">
                    <img onWheel={this.handleMouseWheel} ref={this.image} />
                </div>
                <Toolbar className="tool-bar">
                    {
                        btns.map(
                            btn => (
                                <IconButton onClick={btn.handler} key={btn.title}>
                                    {React.createElement(btn.icon, { fontSize: "large" })}
                                </IconButton>
                            )
                        )
                    }
                </Toolbar>
            </div>
        );
    }

}