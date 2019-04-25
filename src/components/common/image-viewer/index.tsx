import * as React from "react";
import {
    IconButton,
    Zoom
} from "@material-ui/core";
import {
    Close
} from "@material-ui/icons";
import {
    zoom,
    zoomIn,
    zoomOut,
    calcDistance,
    getImageSize,
    handleEdge,
    handleTouchZoomOut
} from "./zoom";
import {
    download,
    eventBus
} from "@common/util";
import ImageComp from "./image";
import ViewerToolbar from "./toolbar";
import "./index.scss";

let uuid = 0;

interface Props {
    visible?: boolean;
    images: Array<object | string>;
    srcProp?: string;
    current?: string;
    onClose: Function;
}

interface State {
    index: number;
    curImages: any[];
    from?: string;
    current: string;
    curImg: any;
}

const MARGIN = 20;

const getItem = (src: string, translateX: number) => {
    return {
        src,
        translateX,
        ref: React.createRef(),
        id: uuid++,
        rotateAngle: 0
    }
}

const getPrev = (index: number, images: any, srcProp: string) => {
    if (index > 0) {
        const img = images[index - 1];
        return getItem(srcProp ? img[srcProp] : img, -window.innerWidth - MARGIN);
    }
}

const getNext = (index: number, images: any, srcProp: string) => {
    if (index < images.length - 1) {
        const img = images[index + 1];
        return getItem(srcProp ? img[srcProp] : img, window.innerWidth + MARGIN);
    }
}

export default class ImageViewer extends React.Component<Props, State> {

    timer: NodeJS.Timeout;
    root: React.RefObject<HTMLDivElement> = React.createRef();
    mouseDowned: boolean = false;
    startX: number | number[] = 0;
    startY: number | number[] = 0;
    endX: number = 0;
    startLeft: number = 0;
    startTop: number = 0;
    isTransitionEnd: boolean = true;
    translated: boolean = false;
    img: HTMLImageElement;

    state = {
        index: 0,
        curImages: [],
        current: "",
        from: "",
        curImg: null
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        eventBus.on("viewer.show", this.addEvent);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
        this.offEvent();
        eventBus.off("viewer.show", this.addEvent);
    }

    static getDerivedStateFromProps(props: Props, state: State) {
        if (state.from) {
            state.from = "";
            return state;
        }
        if (props.visible) {
            eventBus.emit("viewer.show");
            if (props.current === state.current) return state;
            state.current = props.current;
            for (let i = 0, l = props.images.length; i < l; i++) {
                let img = props.images[i];
                let tmp = img;
                if (props.srcProp) {
                    tmp = img[props.srcProp];
                }
                if (tmp === props.current) {
                    let next = getNext(i, props.images, props.srcProp);
                    let prev = getPrev(i, props.images, props.srcProp);
                    state.curImages = [state.curImg = getItem(tmp, 0)];
                    state.index = i;
                    state.current = tmp;
                    state.curImages.push(next);
                    state.curImages.unshift(prev);
                    break;
                }
            }
        }
        return state;
    }

    addEvent = () => {
        //prevent from scaling the page
        document.body.addEventListener("touchmove", this.preventDefault, { passive: false });
        //prevent from scrolling the page
        document.body.addEventListener("wheel", this.preventDefault, { passive: false });
        document.addEventListener("keyup", this.handleKeyDown);
        this.handleResize();
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
        this.offEvent();
        this.props.onClose();
    }

    getCurrent = (isImage: boolean = false) => {
        let { curImg } = this.state;
        if (!curImg) return null;
        const current = curImg.ref.current as ImageComp;
        if (!current) return null;
        return isImage ? current.image.current : current;
    }

    to = (dir: 1 | -1) => {
        let {
            index,
            curImages
        } = this.state;
        let {
            images,
            srcProp
        } = this.props;
        let _index = index + dir;
        if (!this.isTransitionEnd) return;
        this.isTransitionEnd = false;
        let first = curImages[0];
        let mid = curImages[1];
        let last = curImages[2];
        mid.translateX = -dir * (window.innerWidth + MARGIN);
        if (dir === 1) {
            last.translateX = 0;
        } else if (dir === -1) {
            first.translateX = 0;
        }
        this.setState({
            curImages: [first, mid, last].map(img => {
                if (img) {
                    //rotate to 0deg
                    img.rotateAngle = 0;
                }
                return img;
            }),
            from: "state"
        });
        //after transition end
        setTimeout(() => {
            let curImg: any;
            this.translated = false;
            if (dir === 1) {
                curImages = [mid, last];
                curImg = last;
                curImages.push(getNext(_index, images, srcProp));
            } else if (dir === -1) {
                curImages = [first, mid];
                curImg = first;
                curImages.unshift(getPrev(_index, images, srcProp));
            }
            this.resize();
            this.setState({
                curImages,
                index: _index,
                curImg,
                current: curImg.src,
                from: "state"
            });
            this.isTransitionEnd = true;
        }, 300);
    }

    next = () => {
        let {
            index
        } = this.state;
        let { images } = this.props;
        if (index === images.length - 1) return;
        this.to(1);
    }

    prev = () => {
        if (this.state.index === 0) return;
        this.to(-1);
    }

    handleResize = () => {
        if (!this.props.visible) return;
        if (this.timer != undefined) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            let { curImages } = this.state;
            curImages = curImages.map(img => {
                if (img) {
                    const ref = img.ref.current as ImageComp;
                    const translate = window.innerWidth + MARGIN;
                    ref && ref.resize();
                    if (img.translateX < 0) {
                        img.translateX = -translate;
                    } else if (img.translateX > 0) {
                        img.translateX = translate;
                    }
                }
                return img;
            });
            this.setState({
                curImages,
                from: "state"
            });
        }, 50);
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
        const { curImg } = this.state;
        if (curImg) {
            let ref = curImg.ref.current as ImageComp;
            ref && ref.resize(fit);
        }
    }

    rotate = (angle: number) => {
        const current = this.getCurrent() as ImageComp;
        if (!current || !current.loaded || current.error) return;
        let {
            curImages,
            curImg
        } = this.state;
        curImages = curImages.map(img => {
            if (img && img.id === curImg.id) {
                img.rotateAngle = angle;
            }
            return img;
        });
        this.setState({
            curImages,
            from: "state"
        }, this.resize);
    }

    rotateTo = (dir: 1 | -1) => {
        const { curImg } = this.state;
        if (!curImg) return;
        let angle = curImg.rotateAngle || 0;
        angle += 90 * dir;
        this.rotate(angle);
    }

    rotateLeft = () => {
        this.rotateTo(-1);
    }

    rotateRight = () => {
        this.rotateTo(1);
    }

    handleMouseWheel = (img: HTMLImageElement, x: number, y: number, dir: number) => {
        if (dir < 0) {
            zoomIn(img, x, y);
        } else {
            zoomOut(img, x, y);
        }
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
            img,
            state: { curImg }
        } = this;
        if (!img || !mouseDowned) return;
        let x = evt.clientX;
        let y = evt.clientY;
        let sx: any = this.startX;
        let sy: any = this.startY;
        let disX: any;
        let disY: number;
        const angle = curImg.rotateAngle;
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
            this.toggleTransition(true);
        } else {
            this.startX = [touches[0].clientX, touches[1].clientX];
            this.startY = [touches[0].clientY, touches[1].clientY];
        }
    }

    toggleTransition = (remove: boolean) => {
        const { root: { current: root } } = this;
        const wrappers = Array.from(root.querySelectorAll(".img-wrapper"));
        wrappers.forEach((el: HTMLElement) => {
            if (remove) {
                el.classList.remove("transition")
            } else {
                el.classList.add("transition");
            }
        });
    }

    moveImage = (dis: number) => {
        let { curImages } = this.state;
        let translate = window.innerWidth + MARGIN;
        let first = curImages[0];
        let second = curImages[1];
        let last = curImages[2];
        second.translateX = dis;
        if (first) {
            first.translateX = -translate + dis;
        }
        if (last) {
            last.translateX = translate + dis;
        }
        this.translated = dis !== 0;
        this.setState({
            curImages: [first, second, last],
            from: "state"
        });
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
            if (this.translated) return;
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
        } else {
            this.endX = touches[0].clientX;
            disX = touches[0].clientX - (startX as any);
            disY = touches[0].clientY - (startY as any);
            const { 
                left,
                minLeft
             } = handleEdge(img, startLeft, startTop, disX, disY);
            if (width > window.innerWidth) {
                let edge = 0;
                if (disX >= 0) {
                    edge = Math.abs(startLeft);
                } else {
                    edge = Math.abs(width - Math.abs(startLeft) - window.innerWidth);
                }
                if ((left >= 0  && disX >0 )|| (left <= minLeft && disX < 0)) {
                    disX = disX > 0 ? (disX - edge) : (disX + edge);
                    this.moveImage(disX);
                }
            } else {
                this.moveImage(disX);
            }

        }
    }

    touchSwitch = (disX: number) => {
        const max = window.innerWidth / 2;
        const {
            state: { index },
            props: { images }
        } = this;
        if (disX <= -max) {
            if (index === images.length - 1) return this.moveImage(0);
            this.next();
        } else if (disX >= max) {
            if (index === 0) return this.moveImage(0);
            this.prev();
        } else {
            this.moveImage(0);
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
            this.toggleTransition(false);
            if (left >= 0 || width - Math.abs(left) <= window.innerWidth) {
                this.touchSwitch(disX);
            } else {
                this.moveImage(0);
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

        const {
            index,
            curImages
        } = this.state;
        const {
            images,
            visible
        } = this.props;
        if (!images || !images.length) return null;
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