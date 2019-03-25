import * as React from "react";
import {
    ZoomIn,
    ZoomOut,
    RotateLeft,
    RotateRight,
    ArrowBack,
    ArrowForward,
    Fullscreen,
    SaveAlt,
    Close
} from "@material-ui/icons";
import {
    IconButton,
    Toolbar
} from "@material-ui/core";
import "./index.scss";

export default class ImageViewer extends React.Component {

    canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
    timer: NodeJS.Timeout;
    state = {
        currentImage: HTMLImageElement
    };

    componentDidMount() {
        this.resize();
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

    resize = () => {
        let canvas = this.canvas.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.loadImag();
    }

    drawImage = (image: HTMLImageElement) => {
        let canvas = this.canvas.current;
        let ctx = canvas.getContext("2d");
        let imgWidth = image.naturalWidth;
        let imgHeight = image.naturalHeight;
        let wScale = imgWidth / canvas.width;
        let hScale = imgHeight / canvas.height;
        let scale = 1;
        if (wScale > 1 && hScale > 1) {
            if (wScale > hScale) {
                scale = wScale;
            } else {
                scale = hScale;
            }
        } else {
            scale = wScale > 1 ? wScale : hScale > 1 ? hScale : 1;
        }
        imgWidth /= scale;
        imgHeight /= scale;
        ctx.drawImage(image, (canvas.width - imgWidth) / 2, (canvas.height - imgHeight) / 2, imgWidth, imgHeight);
        console.log()
    }

    loadImag() {
        let image = new Image();
        image.onload = () => {
            this.drawImage(image);
            image.onload = null;
        };
        image.src = "https://cn.bing.com/th?id=OHR.TashkurganGrasslands_ZH-CN1141881683_1920x1080.jpg&rf=NorthMale_1920x1080.jpg";
    }

    render() {
        const btns = [{
            icon: ZoomIn,
            title: "放大"
        }, {
            icon: ZoomOut,
            title: "缩小"
        }, {
            icon: RotateLeft,
            title: "左旋转90度"
        }, {
            icon: RotateRight,
            title: "右旋转90度"
        }, {
            icon: ArrowBack,
            title: "上一张"
        }, {
            icon: ArrowForward,
            title: "下一张"
        }, {
            icon: SaveAlt,
            title: "下载"
        }];

        return (
            <div className="image-viewer-wrapper">
                <IconButton className="close-btn" color="inherit">
                    <Close fontSize="large" />
                </IconButton>
                <canvas ref={this.canvas}></canvas>
                <Toolbar className="tool-bar">
                    {
                        btns.map(
                            btn => (
                                <IconButton key={btn.title}>
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