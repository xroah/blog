import * as React from "react";
import {
    IconButton,
    Zoom
} from "@material-ui/core";
import {
    Close, Translate
} from "@material-ui/icons";
import {
    zoom,
    zoomIn,
    zoomOut,
    calcDistance,
    getMiddlePos,
    getImageSize,
    handleEdge,
    handleTouchZoomOut
} from "./zoom";
import { download } from "@common/util";
import ImageComp from "./image";
import ViewerToolbar from "./toolbar";
import "./index.scss";

let uuid = 0;

interface Props {
    //find images element from, default body
    findFrom?: HTMLElement;
}

const MARGIN = 20;

export default class ImageViewer extends React.Component<Props> {

    timer: NodeJS.Timeout;
    root: React.RefObject<HTMLDivElement> = React.createRef();
    mouseDowned: boolean = false;
    startX: number | number[] = 0;
    startY: number | number[] = 0;
    endX: number = 0;
    startLeft: number = 0;
    startTop: number = 0;
    imgCls = `img-${Date.now()}`;
    resized = false;
    current: any;
    isTransitionEnd: boolean = true;
    img: HTMLImageElement;

    static defaultProps = {
        findFrom: document.body
    };

    state = {
        visible: false,
        images: [],
        index: 0,
        curImages: []
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        document.body.addEventListener("click", this.handleClickImage);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
        document.body.removeEventListener("click", this.handleClickImage);
        this.offEvent();
    }

    offEvent = () => {
        document.body.removeEventListener("touchmove", this.preventDefault);
        document.body.removeEventListener("wheel", this.preventDefault);
        document.removeEventListener("keyup", this.handleKeyDown);
    }

    preventDefault = (evt: TouchEvent | WheelEvent) => {
        evt.preventDefault();
    }

    handleClose = () => {
        this.setState({
            visible: false
        });
        this.offEvent();
    }

    getCurrent = (isImage: boolean = false) => {
        if (!this.current) return null;
        const current = this.current.ref.current as ImageComp;
        if (!current) return null;
        return isImage ? current.image.current : current;
    }

    handleClickImage = (evt: MouseEvent) => {
        if (evt.button !== 0) return;//right click also fire click event in firefox
        let tgt = evt.target as HTMLImageElement;
        let nodeName = tgt.nodeName.toLowerCase();
        let {
            props: { findFrom },
            state: {
                index
            },
            imgCls,
            root: {current: root}
        } = this;
        if (root.contains(tgt)) return;
        if (nodeName === "img" && findFrom.contains(tgt)) {
            let imgs = findFrom.querySelectorAll(`img:not(.${imgCls})`);
            console.log("===============>click")
            let state = {
                visible: true,
                images: [],
                curImages: [],
                rotateAngle: 0,
                index
            };
            let src: string;
            let _imgs: string[] = [];
            for (let i = 0, l = imgs.length; i < l; i++) {
                const tmp = imgs[i] as HTMLImageElement; 
                if (!src && tgt.src === tmp.src) {//src maybe duplicated
                    index = i;
                    src = tmp.src;
                }
                _imgs.push(tmp.src);
            }
            state.images = _imgs;
            state.curImages.push(this.current = this.getItem(src, 0));
            let next = this.getNext(index, _imgs);
            let prev = this.getPrev(index, _imgs);
            next && state.curImages.push(next);
            prev && state.curImages.unshift(prev);
            state.index = index;
            //prevent from scaling the page
            document.body.addEventListener("touchmove", this.preventDefault, { passive: false });
            //prevent from scrolling the page
            document.body.addEventListener("wheel", this.preventDefault, { passive: false });
            document.addEventListener("keyup", this.handleKeyDown);
            this.setState(state);
        }
    }

    getItem = (src: string, translateX: number) => {
        return {
            src,
            translateX,
            ref: React.createRef(),
            id: uuid++,
            rotateAngle: 0
        }
    }

    getPrev = (index: number, images: any) => {
        if (index > 0) {
            return this.getItem(images[index - 1], -window.innerWidth - MARGIN);
        }
    }

    getNext = (index: number, images: any) => {
        if (index < images.length - 1) {
            return this.getItem(images[index + 1], window.innerWidth + MARGIN);
        }
    }

    to = (dir: number) => {
        let {
            images,
            index,
            curImages
        } = this.state;
        let _index = index + dir;
    if (!this.isTransitionEnd) return;
        this.isTransitionEnd = false;
        if (index === 0) {
            curImages.unshift(null);
        } else if (index === images.length - 1) {
            curImages.push(null);
        }
        let first = curImages[0];
        let mid = curImages[1];
        let last = curImages[2];
        if (dir === 1) {
            last.translateX = 0;
            mid.translateX = -window.innerWidth - MARGIN;
        } else if (dir === -1) {
            first.translateX = 0;
            mid.translateX = window.innerWidth + MARGIN;
        }
        this.setState(
            {
                curImages: [first, mid, last].map(img => {
                    if (img && img.id === this.current.id) {
                        //rotate to 0deg
                        img.rotateAngle = 0;
                    }
                    return img;
                })
            },
            //then resize the current img
            () => this.resize()
        );
        //after transition end
        setTimeout(() => {
            // mid.cls = "";
            if (dir === 1) {
                curImages = [mid, last];
                this.current = last;
                if (_index < images.length - 1) {
                    curImages.push(this.getNext(_index, images));
                }
            } else if (dir === -1) {
                curImages = [first, mid];
                this.current = first;
                if (_index > 0) {
                    curImages.unshift(this.getPrev(_index, images));
                }
            }
            this.setState({
                curImages,
                index: _index
            });
            this.isTransitionEnd = true;
        }, 300);
    }

    next = () => {
        let {
            index,
            images
        } = this.state;
        if (index === images.length - 1) return;
        this.to(1);
    }

    prev = () => {
        if (this.state.index === 0) return;
        this.to(-1);
    }

    handleResize = () => {
        if (!this.state.visible) return;
        if (this.timer != undefined) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            let { curImages } = this.state;
            curImages = curImages.map(img => {
                if (img) {
                    const ref = img.ref.current as ImageComp;
                    ref && ref.resize();
                    if (img.translateX < 0) {
                        img.translateX = -window.innerWidth - MARGIN
                    } else if (img.translateX > 0) {
                        img.translateX = window.innerWidth + MARGIN;
                    }
                }
                return img;
            });
            this.setState({
                curImages
            });
        }, 300);
    }

    handleZoomIn = () => {
        let img = this.getCurrent(true) as HTMLImageElement;
        img && zoomIn(img);
    }

    handleZoomOut = () => {
        let img = this.getCurrent(true) as HTMLImageElement;
        img && zoomOut(img);
    }

    //reset to real size
    reset = () => {
        this.resize(false);
    }

    resize = (fit: boolean = true) => {
        if (this.current) {
            let ref = this.current.ref.current as ImageComp;
            ref && ref.resize(fit);
        }
    }

    rotate = (angle: number) => {
        const current = this.getCurrent() as ImageComp;
        if (!current || !current.loaded || current.error) return;
        let { curImages } = this.state;
        curImages = curImages.map(img => {
            if (img && img.id === this.current.id) {
                img.rotateAngle = angle;
            }
            return img;
        });
        this.setState({
            curImages
        }, this.resize);
    }

    rotateLeft = () => {
        if (!this.current) return;
        let angle = this.current.rotateAngle;
        angle -= 90;
        this.rotate(angle);
    }

    rotateRight = () => {
        if (!this.current) return;
        let angle = this.current.rotateAngle || 0;
        angle += 90;
        this.rotate(angle);
    }

    handleMouseWheel = (img: HTMLImageElement, x: number, y: number, dir: number) => {
        if (dir < 0) {
            zoomIn(img, x, y);
        } else {
            zoomOut(img, x, y);
        }
        this.resized = false;
    }

    handleMouseDown = (img: HTMLImageElement, x: number, y: number) => {
        let style = getComputedStyle(img);
        this.mouseDowned = true;
        this.startX = x;
        this.startY = y;
        this.startLeft = parseFloat(style.getPropertyValue("left"));
        this.startTop = parseFloat(style.getPropertyValue("top"));
        this.img = img;
    }

    handleMouseMove = (evt: React.MouseEvent) => {
        let {
            mouseDowned,
            startLeft,
            startTop,
            img
        } = this;
        if (!img || !mouseDowned) return;
        let x = evt.clientX;
        let y = evt.clientY;
        let sx: any = this.startX;
        let sy: any = this.startY;
        let disX: any;
        let disY: number;
        const angle = this.current.rotateAngle;
        switch (angle) {
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
        let img = this.getCurrent(true) as HTMLImageElement;
        img && download(img.src);
    }

    handleTouchStart = (evt: React.TouchEvent) => {
        let touches = evt.touches;
        let img = evt.currentTarget.querySelector("img");
        if (touches.length === 1) {
            let { left, top } = getImageSize(img);
            this.startX = this.endX = touches[0].clientX;
            this.startY = touches[0].clientY;
            this.startLeft = left;
            this.startTop = top;
        } else {
            this.startX = [touches[0].clientX, touches[1].clientX];
            this.startY = [touches[0].clientY, touches[1].clientY];
        }
    }

    handleTouchMove = (evt: React.TouchEvent) => {
        let {
            startX,
            startY,
            startLeft,
            startTop
        } = this
        let touches = evt.touches;
        let img = evt.currentTarget.querySelector("img");
        let {
            width
        } = getImageSize(img);
        let disX: number;
        let disY: number;
        if (touches.length > 1) {
            let startDis = calcDistance(startX[0], startY[0], startX[1], startY[1]);
            let endDis = calcDistance(
                touches[0].clientX,
                touches[0].clientY,
                touches[1].clientX,
                touches[1].clientY
            );
            let ratio = endDis / startDis;
            if (ratio < 1) {
                if (width <= window.innerWidth) return;
                handleTouchZoomOut(img, 0.97);
            } else {
                if (width < img.naturalWidth) {
                    zoom(img, 1.03);
                }
            }
            this.startX = [touches[0].clientX, touches[1].clientX];
            this.startY = [touches[0].clientY, touches[1].clientY];
            this.resized = false;
        } else {
            this.endX = touches[0].clientX;
            disX = touches[0].clientX - (startX as any);
            disY = touches[0].clientY - (startY as any);
            handleEdge(img, startLeft, startTop, disX, disY);
        }
    }

    touchSwitch = (disX: number) => {
        if (disX <= -100) {
            this.next();
        } else if (disX >= 100) {
            this.prev();
        }
    }

    handleTouchEnd = (evt: React.TouchEvent) => {
        let touches = evt.touches;
        let img = evt.currentTarget.querySelector("img");
        let {
            width,
            left,
            top
        } = getImageSize(img);
        if (width < window.innerWidth) {
            this.resize();
        }
        const len = touches.length;
        if (len === 1) {
            //only one finger,reset start positions
            //when moving finger, move the image
            this.startLeft = left;
            this.startTop = top;
            this.startX = this.endX = touches[0].clientX;
            this.startY = touches[0].clientY;
        } else if (!len) {
            let disX = this.endX - (this.startX as number);
            if (left >= 0 || width - Math.abs(left) <= window.innerWidth) {
                this.touchSwitch(disX);
            }
        }
    }

    handleKeyDown = (evt: KeyboardEvent) => {
        const key = evt.key.toLowerCase();
        const ctrlPressed = evt.ctrlKey;
        switch (key) {
            case "arrowleft":
                ctrlPressed ? this.rotateLeft() : this.prev();
                break;
            case "arrowright":
                ctrlPressed ? this.rotateRight() : this.next();
                break;
            case "escape":
                this.handleClose();
                break;
            case "=":
                ctrlPressed && this.handleZoomIn();
                break;
            case "-":
                ctrlPressed && this.handleZoomOut()
                break;
            case "0":
                ctrlPressed && this.resize();
                break;
        }
        evt.preventDefault();
    }

    render() {

        let {
            visible,
            images,
            index,
            curImages
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
                    <ViewerToolbar
                        showPrev={index > 0}
                        showNext={index < images.length - 1}
                        zoomIn={this.handleZoomIn}
                        zoomOut={this.handleZoomOut}
                        reset={this.reset}
                        resize={this.resize}
                        rotateLeft={this.rotateLeft}
                        rotateRight={this.rotateRight}
                        download={this.download}
                        prev={this.prev}
                        next={this.next} />
                    {
                        curImages.map(img => {
                            if (!img) return null;
                            return (
                                <ImageComp
                                    key={img.id}
                                    src={img.src}
                                    translateX={img.translateX}
                                    rotateAngle={img.rotateAngle || 0}
                                    imgClass={this.imgCls}
                                    ref={img.ref}
                                    onMouseDown={this.handleMouseDown}
                                    onMouseWheel={this.handleMouseWheel}
                                    onTouchStart={this.handleTouchStart}
                                    onTouchMove={this.handleTouchMove}
                                    onTouchEnd={this.handleTouchEnd} />
                            );
                        })
                    }

                </div>
            </Zoom>
        );
    }

}