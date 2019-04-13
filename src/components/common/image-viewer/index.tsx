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
    Toolbar,
    Zoom
} from "@material-ui/core";
import {
    zoom,
    zoomIn,
    zoomOut,
    calcScale,
    center,
    calcDistance,
    getMiddlePos
} from "./zoom";
import Loading from "@common/loading";
import message from "@common/message";
import { download } from "@common/util";
import "./index.scss";

interface Props {
    //find images element from, default body
    findFrom?: HTMLElement;
}

export default class ImageViewer extends React.Component<Props> {

    timer: NodeJS.Timeout;
    image: React.RefObject<HTMLImageElement> = React.createRef();
    imgWrapper: React.RefObject<HTMLDivElement> = React.createRef();
    root: React.RefObject<HTMLDivElement> = React.createRef();
    rotateAngle: number = 0;
    mouseDowned: boolean = false;
    startX: number | number[] = 0;
    startY: number | number[] = 0;
    endX: number = 0;
    startLeft: number = 0;
    startTop: number = 0;
    imgCls = `img-${Date.now()}`;
    resized = false;

    static defaultProps = {
        findFrom: document.body
    };

    state = {
        visible: false,
        current: "",
        images: [],
        index: 0,
        loaded: false,
        error: false
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        window.addEventListener("click", this.handleClickImage);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
        window.removeEventListener("click", this.handleClickImage);
        document.body.removeEventListener("wheel", this.preventDefault);
        document.body.removeEventListener("touchmove", this.preventDefault);
    }

    handleImageLoad = () => {
        this.setState({
            loaded: true,
            error: false
        }, () => {
            this.rotate(0);
        });
    }

    handleImageError = () => {
        let {
            state: {
                current,
                visible
            }
        } = this;
        if (visible && current) {
            message.error("图片加载出错");
        }
        this.setState({
            error: true,
            loaded: false
        });
    }

    preventDefault = (evt: TouchEvent | WheelEvent) => {
        evt.preventDefault();
    }

    handleClose = (evt: React.MouseEvent) => {
        this.setState({
            visible: false
        });
        document.body.removeEventListener("touchmove", this.preventDefault);
        document.body.removeEventListener("wheel", this.preventDefault);
    }

    handleClickImage = (evt: MouseEvent) => {
        if (evt.button !== 0) return;//right click also fire click event in firefox
        let tgt = evt.target as HTMLImageElement;
        let nodeName = tgt.nodeName.toLowerCase();
        let {
            image: { current: img },
            props: { findFrom },
            state: {
                current,
                index
            },
            imgCls
        } = this;
        if (nodeName === "img" && tgt !== img && findFrom.contains(tgt)) {
            let imgs = Array.from(
                findFrom.querySelectorAll(`img:not(.${imgCls})`)
            ).map((i: HTMLImageElement) => i.src);
            let state: any = {
                visible: true,
                images: imgs
            };
            if (current !== tgt.src) {
                state.current = tgt.src;
                state.loaded = false;
                for (let i = 0, l = imgs.length; i < l; i++) {
                    if (tgt.src === imgs[i]) {
                        index = i;
                        break;
                    }
                }
            }
            state.index = index;
            //prevent from scaling the page
            document.body.addEventListener("touchmove", this.preventDefault, { passive: false });
            //prevent from scrolling the page
            document.body.addEventListener("wheel", this.preventDefault, { passive: false });
            this.setState(state);
        }
    }

    to = (index: number) => {
        let {
            state: { images },
            image: { current: image }
        } = this;
        if (index < 0 || index >= images.length) return;
        image.style.width = "0px";
        image.style.height = "0px";
        this.setState({
            index,
            current: images[index],
            loaded: false
        });
    }

    next = () => {
        this.to(this.state.index + 1);
    }

    prev = () => {
        this.to(this.state.index - 1);
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
            state: { loaded, error },
            image: { current: img },
            imgWrapper: { current: wrapper },
            rotateAngle
        } = this;
        if (loaded && !error) {
            let width;
            let height;
            //rotate 0 deg or 180deg;
            if (rotateAngle / 90 % 2 === 0) {
                width = window.innerWidth;
                height = window.innerHeight;
            } else {
                //90deg or 270deg;
                width = window.innerHeight;
                height = window.innerWidth;
            }
            wrapper.style.width = `${width}px`;
            wrapper.style.height = `${height}px`;
            calcScale(img, wrapper, fit);
            center(wrapper, img);
            this.resized = true;
        }
    }

    handleZoomIn = () => {
        zoomIn(this.image.current);
    }

    handleZoomOut = () => {
        zoomOut(this.image.current);
    }

    //reset to real size
    reset = () => {
        this.resize(false);
    }

    rotate = (angle: number) => {
        let {
            imgWrapper: { current: wrapper },
            state: { loaded, error }
        } = this;
        if (!loaded || error) return;
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
        let {
            image: { current: img }
        } = this;
        if (dir < 0) {
            zoomIn(img, x, y);
        } else {
            zoomOut(img, x, y);
        }
        this.resized = false;
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
            startLeft,
            startTop
        } = this;
        if (!mouseDowned) return;
        let x = evt.clientX;
        let y = evt.clientY;
        let sx: any = this.startX;
        let sy: any = this.startY;
        let disX: any;
        let disY: number;
        switch (rotateAngle) {
            case 90:
                disX = y - sy;
                disY = sx - x;
                break;
            case 180:
                disX = sx - x;
                disY = sy - y;
                break;
            case 270:
                disX = sy - y;
                disY = x - sx;
                break;
            default:
                disX = x - sx;
                disY = y - sy;
        }
        img.style.left = `${startLeft + disX}px`;
        img.style.top = `${startTop + disY}px`;
    }

    handleMouseUp = () => {
        this.mouseDowned = false;
    }

    download = () => {
        download(this.image.current.src);
    }

    handleTouchStart = (evt: React.TouchEvent) => {
        let touches = evt.touches;
        if (touches.length === 1) {
            let { left, top } = this.getImageSize();
            this.startX = touches[0].clientX;
            this.startY = touches[0].clientY;
            this.startLeft = left;
            this.startTop = top;
        } else {
            this.startX = [touches[0].clientX, touches[1].clientX];
            this.startY = [touches[0].clientY, touches[1].clientY];
        }
    }

    getImageSize = () => {
        let {
            image: { current: img }
        } = this;
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

    handleTouchMove = (evt: React.TouchEvent) => {
        let {
            startX,
            startY,
            startLeft,
            startTop,
            image: { current: img },
            resized
        } = this
        let touches = evt.touches;
        let {
            width,
            height,
            left,
            top
        } = this.getImageSize();
        let disX: number;
        let disY: number;
        if (touches.length > 1) {
            let startDis = calcDistance(startX[0], startY[0], startX[1], startY[1]);
            let {
                midX,
                midY
            } = getMiddlePos(
                img,
                touches[0].clientX,
                touches[0].clientY,
                touches[1].clientX,
                touches[1].clientY
            );
            let endDis = calcDistance(
                touches[0].clientX,
                touches[0].clientY,
                touches[1].clientX,
                touches[1].clientY
            );
            let ratio = endDis / startDis;
            if (ratio < 1) {
                if (img.naturalWidth / width > 20) return;
                zoom(img, 0.98, midX, midY);
            } else {
                if (width < img.naturalWidth) {
                    zoom(img, 1.02, midX, midY);
                }
            }
            this.startX = [touches[0].clientX, touches[1].clientX];
            this.startY = [touches[0].clientY, touches[1].clientY];
            this.resized = false;
        } else {
            this.endX = touches[0].clientX;
            const rect = img.getBoundingClientRect();
            if (
                resized
            ) return;
            disX = touches[0].clientX - (startX as any);
            disY = touches[0].clientY - (startY as any);
            let _left = startLeft + disX;
            let _top = startTop + disY;
            console.log(rect)
            if (rect.bottom < window.innerHeight && rect.top > 0) {
                _top = startTop;
            } else if (disY > 0 && rect.top >= 0) {
                _top = 0;
            } else if (disY < 0 && rect.bottom <= window.innerHeight) {
                _top = window.innerHeight - height;
            }
            if (rect.left > 0 && rect.right < window.innerWidth) {
                _left = startLeft;
            } else if (disX > 0 && rect.left >= 0) {
                _left = 0;
            } else if (disX < 0 && rect.right <= window.innerWidth) {
                _left = window.innerWidth - width;
            }
            img.style.left = `${_left}px`;
            img.style.top = `${_top}px`;
        }
    }

    handleTouchEnd = (evt: React.TouchEvent) => {
        let touches = evt.touches;
        let { width } = this.getImageSize();
        if (width < window.innerWidth) {
            this.resize();
        }
        const len = touches.length;
        if (len === 1) {
            let { left, top } = this.getImageSize();
            //only one finger,reset start positions
            //when moving finger, move the image
            this.startLeft = left;
            this.startTop = top;
            this.startX = touches[0].clientX;
            this.startY = touches[0].clientY;
        } else if (!len) {
            let disX = this.endX - (this.startX as number);
            if (this.resized) {
                if (disX <= -50) {
                    this.next();
                } else if (disX >= 50) {
                    this.prev();
                }
                return;
            }
        }
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

        let {
            visible,
            loaded,
            current,
            images,
            index,
            error
        } = this.state;
        return (
            <Zoom in={visible}>
                <div
                    ref={this.root}
                    onMouseLeave={this.handleMouseUp}
                    onMouseMove={this.handleMouseMove}
                    onMouseUp={this.handleMouseUp}
                    className="image-viewer-wrapper">
                    <div
                        style={{ position: "absolute", left: 0, top: 0 }}
                        id="info"></div>
                    <IconButton
                        onClick={this.handleClose}
                        className="close-btn">
                        <Close fontSize="large" />
                    </IconButton>
                    {
                        images.length > 1 && (
                            <>
                                {
                                    index > 0 && (
                                        <IconButton
                                            onClick={this.prev}
                                            className="nav-btn nav-prev"
                                            title="上一张">
                                            <NavigateBefore fontSize="large" />
                                        </IconButton>
                                    )
                                }
                                {
                                    index < images.length - 1 && (
                                        <IconButton
                                            onClick={this.next}
                                            className="nav-btn nav-next"
                                            title="下一张">
                                            <NavigateNext fontSize="large" />
                                        </IconButton>
                                    )
                                }
                            </>
                        )
                    }
                    {!loaded && !error && <Loading />}
                    <div ref={this.imgWrapper} className="img-wrapper">
                        <img
                            draggable={false}
                            src={current}
                            className={this.imgCls}
                            onLoad={this.handleImageLoad}
                            onError={this.handleImageError}
                            onWheel={this.handleMouseWheel}
                            onMouseDown={this.handleMouseDown}
                            onTouchStart={this.handleTouchStart}
                            onTouchMove={this.handleTouchMove}
                            onTouchEnd={this.handleTouchEnd}
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
            </Zoom>
        );
    }

}