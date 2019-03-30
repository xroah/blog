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
    center
} from "./zoom";
import Loading from "@common/loading";
import message from "@common/message";
import "./index.scss";

interface Props {
    image?: string | HTMLImageElement;
    images?: string[];
    visible?: boolean;
    //bind click event to the img, click img will show the image viewer
    //if true, image and image will be ignored
    autoBind?: boolean;
}

export default class ImageViewer extends React.Component<Props> {

    timer: NodeJS.Timeout;
    image: React.RefObject<HTMLImageElement> = React.createRef();
    imgWrapper: React.RefObject<HTMLDivElement> = React.createRef();
    root: React.RefObject<HTMLDivElement> = React.createRef();
    rotateAngle: number = 0;
    mouseDowned: boolean = false;
    startX: number = 0;
    startY: number = 0;
    startLeft: number = 0;
    startTop: number = 0;

    state = {
        visible: false,
        current: "",
        images: [],
        index: 0,
        from: "",
        autoBind: this.props.autoBind,
        loaded: false
    };

    componentDidMount() {
        let {
            props: { autoBind },
            root: { current: root }
        } = this;
        window.addEventListener("resize", this.handleResize);
        /**
         * React event binding:
         * [Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. 
         */
        root.addEventListener("touchstart", this.preventScale, { passive: true });
        if (autoBind) {
            window.addEventListener("click", this.handleClickImage);
        }
    }

    componentWillUnmount() {
        let {
            root: { current: root }
        } = this;
        window.removeEventListener("resize", this.handleResize);
        window.removeEventListener("click", this.handleClickImage);
        root && root.removeEventListener("touchstart", this.preventScale);
    }

    handleImageLoad = () => {
        this.setState({
            loaded: true
        }, () => {
            this.rotate(0);
        });
    }

    handleImageError = () => {
        if (this.state.current) {
            message.error("图片加载出错");
        }
    }

    static getDerivedStateFromProps(props, state) {
        let _state = {
            ...state
        };
        if (_state.from) {
            _state.from === "";
        } else {
            if (_state.autoBind) return _state;
            if (_state.visible !== props.visible) {
                _state.visible = props.visible;
            }
            if (
                _state.current !== props.image ||
                _state.images.length !== props.images.length
            ) {
                _state.current = props.image;
                let index = -1;
                let images = props.images || [];
                _state.images = props.images;
                for (let i = 0, l = images.length; i < l; i++) {
                    if (images[i] === _state.current) {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    index = 0;
                    _state.current = _state.images[0];
                }
                _state.index = index;
            }
            _state.loaded = _state.current === props.image;
        }
        return _state;
    }

    preventScale = (evt: TouchEvent) => {
        evt.preventDefault();
        evt.stopPropagation();
    }

    handleClose = () => {
        this.setState({
            visible: false,
            from: "state"
        });
    }

    handleClickImage = (evt: MouseEvent) => {
        let tgt = evt.target as HTMLImageElement;
        let nodeName = tgt.nodeName.toLowerCase();
        if (nodeName === "img" && tgt !== this.image.current) {
            this.setState({
                visible: true,
                from: "state",
                current: tgt.src,
                loaded: this.state.current === tgt.src
            });
        }
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
            state: { loaded },
            image: { current: img },
            imgWrapper: { current: wrapper },
            rotateAngle
        } = this;
        if (loaded) {
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
            calcScale(img, wrapper, fit);
            center(wrapper, img);
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
            state: { loaded }
        } = this;
        if (!loaded) return;
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
        evt.preventDefault();
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
        a.href = this.image.current.src;
        a.download = "";
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

        let {
            state: {
                visible,
                loaded,
                current
            },
            props: { autoBind }
        } = this;
        return (
            <Zoom in={visible}>
                <div
                    ref={this.root}
                    onMouseLeave={this.handleMouseUp}
                    onMouseMove={this.handleMouseMove}
                    onMouseUp={this.handleMouseUp}
                    className="image-viewer-wrapper">
                    <IconButton
                        onClick={this.handleClose}
                        className="close-btn">
                        <Close fontSize="large" />
                    </IconButton>
                    {
                        !autoBind && (
                            <>
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
                            </>
                        )
                    }
                    {!loaded && <Loading />}
                    <div ref={this.imgWrapper} className="img-wrapper">
                        <img
                            draggable={false}
                            src={current}
                            onLoad={this.handleImageLoad}
                            onError={this.handleImageError}
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
            </Zoom>
        );
    }

}