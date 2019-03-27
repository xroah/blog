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
    imageLeft: number = 0;
    imageTop: number = 0;
    imageLoaded: boolean = false;

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

    resize = (isScale: boolean = true) => {
        let {
            imageLoaded,
            image: { current: img }
        } = this;
        if (imageLoaded) {
            this.calcScale(isScale);
            let left = (window.innerWidth - img.width) / 2;
            let top = (window.innerHeight - img.height) / 2;
            img.style.left = `${left}px`;
            img.style.top = `${top}px`;
        }
    }

    calcScale = (isScale: boolean = true) => {
        let {
            image: { current: img }
        } = this;
        let imgWidth = img.naturalWidth;
        let imgHeight = img.naturalHeight;
        let wScale = imgWidth / window.innerWidth;
        let hScale = imgHeight / window.innerHeight;
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
            this.resize();
        };
        img.src = "https://cn.bing.com/th?id=OHR.AthensNight_ZH-CN1280970241_1920x1080.jpg&rf=NorthMale_1920x1080.jpg&pid=hp";
    }

    zoom = (ratio: number, baseX?: number, baseY?: number) => {
        let {
            image: { current: img }
        } = this;
        let style = getComputedStyle(img);
        let origW = img.width;
        let origH = img.height;
        baseX = baseX || origW / 2;
        baseY = baseY || origH / 2;
        let w = origW * ratio;
        let h = origH * ratio;
        let l = parseFloat(style.getPropertyValue("left")) + baseX - baseX * ratio;
        let t = parseFloat(style.getPropertyValue("top")) + baseY - baseY * ratio;
        img.width *= ratio;
        img.height *= ratio;
        img.style.left = `${l}px`;
        img.style.top = `${t}px`;
    }

    zoomIn = (baseX?: number, baseY?: number, scale?: number) => {
        let img = this.image.current;
        if (img.width / img.naturalWidth > 20) return;
        this.zoom(1.1, baseX, baseY);
    }

    zoomOut = (baseX?: number, baseY?: number, scale?: number) => {
        let img = this.image.current;
        if (img.naturalWidth / img.width > 20) return;
        this.zoom(.9, baseX, baseY);
    }

    handleZoomIn = () => {
        this.zoomIn();
    }

    handleZoomOut = () => {
        this.zoomOut();
    }

    reset = () => {
        this.resize(false);
    }

    handleMouseWheel = (evt: React.WheelEvent) => {
        let img = this.image.current;
        let dir = evt.deltaY;
        let x = evt.clientX;
        let y = evt.clientY;
        let rect = img.getBoundingClientRect();
        x = x - rect.left;
        y = y - rect.top;
        console.log(x, y)
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
            handler: () => 0
        }, {
            icon: RotateRight,
            title: "右旋转90度",
            handler: () => 0
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
                <img
                    onDragStart={this.handleDragStart}
                    onWheel={this.handleMouseWheel}
                    ref={this.image} />
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