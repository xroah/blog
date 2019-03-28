import * as React from "react";
import {
    ZoomIn,
    ZoomOut,
    RotateLeft,
    RotateRight,
    NavigateBefore,
    NavigateNext,
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
    mouseDowned: boolean = false;
    startX: number = 0;
    startY: number = 0;
    startLeft: number = 0;
    startTop: number = 0;

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
    resize = (fit: boolean = true) => {
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
            this.calcScale(fit);
            let left = (wrapper.offsetWidth - img.width) / 2;
            let top = (wrapper.offsetHeight - img.height) / 2;
            img.style.left = `${left}px`;
            img.style.top = `${top}px`;
        }
    }

    calcScale = (fit: boolean = true) => {
        let {
            image: { current: img },
            imgWrapper: { current: wrapper }
        } = this;
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

    zoom = (ratio: number, baseX?: number, baseY?: number) => {
        let {
            image: { current: img }
        } = this;
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

    zoomIn = (baseX?: number, baseY?: number) => {
        let img = this.image.current;
        if (img.width / img.naturalWidth > 20) return;
        this.zoom(1.1, baseX, baseY);
    }

    zoomOut = (baseX?: number, baseY?: number) => {
        let img = this.image.current;
        if (img.naturalWidth / img.width > 20) return;
        this.zoom(.91, baseX, baseY);
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
        let dir = evt.deltaY;
        let x = evt.nativeEvent.offsetX;
        let y = evt.nativeEvent.offsetY;
        if (dir < 0) {
            this.zoomIn(x, y);
        } else {
            this.zoomOut(x, y);
        }
    }

    handleMouseDown = (evt: React.MouseEvent) => {
        let style = getComputedStyle(this.image.current);
        this.mouseDowned = true;
        this.startX = evt.clientX;
        this.startY = evt.clientY;
        this.startLeft = parseFloat(style.getPropertyValue("left"));
        this.startTop = parseFloat(style.getPropertyValue("top"));
    }

    handleMouseMove = (evt: React.MouseEvent) => {
        let {
            image: { current: img },
            mouseDowned,
            rotateAngle,
            startX,
            startY,
            startLeft,
            startTop
        } = this;
        if (!mouseDowned) return;
        let x = evt.clientX;
        let y = evt.clientY;
        let disX: number;
        let disY: number;
        switch (rotateAngle) {
            case 90:
                disX = y - startY;
                disY = startX - x;
                break;
            case 180:
                disX = startX - x;
                disY = startY - y;
                break;
            case 270:
                disX = startY - y;
                disY = x - startX;
                break;
            default:
                disX = x - startX;
                disY = y - startY;
        }
        img.style.left = `${startLeft + disX}px`;
        img.style.top = `${startTop + disY}px`;
    }

    handleMouseUp = () => {
        this.mouseDowned = false;
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
            icon: SaveAlt,
            title: "下载",
            handler: this.download
        }];

        return (
            <div
                onMouseLeave={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                className="image-viewer-wrapper">
                <IconButton className="close-btn" color="inherit">
                    <Close fontSize="large" />
                </IconButton>
                <IconButton
                    className="nav-btn nav-prev"
                    title="上一张">
                    <NavigateBefore fontSize="large" />
                </IconButton>
                <IconButton
                    className="nav-btn nav-next"
                    title="下一张">
                    <NavigateNext fontSize="large" />
                </IconButton>
                <div ref={this.imgWrapper} className="img-wrapper">
                    <img
                        draggable={false}
                        onWheel={this.handleMouseWheel}
                        onMouseDown={this.handleMouseDown}
                        ref={this.image} />
                </div>
                <Toolbar className="tool-bar">
                    {
                        btns.map(
                            btn => (
                                <IconButton
                                    onClick={btn.handler}
                                    title={btn.title}
                                    key={btn.title}>
                                    {React.createElement(btn.icon)}
                                </IconButton>
                            )
                        )
                    }
                </Toolbar>
            </div>
        );
    }

}