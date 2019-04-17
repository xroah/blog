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
    SaveAlt
} from "@material-ui/icons";
import {
    IconButton,
    Toolbar
} from "@material-ui/core";

interface Props {
    showPrev?: boolean;
    showNext?: boolean;
    zoomIn: () => any;
    zoomOut: () => any;
    reset: () => any;
    resize: () => any;
    rotateLeft: () => any;
    rotateRight: () => any;
    download: () => any;
    prev: () => any;
    next: () => any;
}

export default class ViewerToolbar extends React.Component<Props> {

    render() {
        const {
            zoomIn,
            zoomOut,
            reset,
            resize,
            rotateLeft,
            rotateRight,
            download,
            prev,
            next,
            showNext,
            showPrev
        } = this.props;
        const btns = [{
            icon: ZoomIn,
            title: "放大",
            handler: zoomIn
        }, {
            icon: ZoomOut,
            title: "缩小",
            handler: zoomOut
        }, {
            icon: PhotoSizeSelectActual,
            title: "原始大小",
            handler: reset
        }, {
            icon: CropSquare,
            title: "适应屏幕",
            handler: resize
        }, {
            icon: RotateLeft,
            title: "左旋转90度",
            handler: rotateLeft
        }, {
            icon: RotateRight,
            title: "右旋转90度",
            handler: rotateRight
        }, {
            icon: SaveAlt,
            title: "下载",
            handler: download
        }];
        return (
            <>
                {
                    showPrev && (
                        <IconButton
                            onClick={prev}
                            className="nav-btn nav-prev"
                            title="上一张">
                            <NavigateBefore fontSize="large" />
                        </IconButton>
                    )
                }
                {
                    showNext && (<IconButton
                        onClick={next}
                        className="nav-btn nav-next"
                        title="下一张">
                        <NavigateNext fontSize="large" />
                    </IconButton>)
                }
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
            </>
        );
    }

}