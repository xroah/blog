import * as React from "react";
import { isFunc } from "@common/util";
import { CircularProgress } from "@material-ui/core";
import {
    calcScale,
    center
} from "./zoom";

interface Props {
    src: string;
    rotateAngle?: number;
    imgClass?: string;
    translateX?: number;
    className?: string;
    onMouseDown?: (img: HTMLImageElement, x: number, y: number) => any;
    onMouseUp?: () => any;
    onMouseWheel?: (img: HTMLImageElement, x: number, y: number, delta: number) => any;
}

export default class ImageComp extends React.Component<Props> {

    image: React.RefObject<HTMLImageElement> = React.createRef();
    wrapper: React.RefObject<HTMLDivElement> = React.createRef();
    loaded: boolean = false;
    error: boolean = false;

    handleMouseEvent = (evt: React.MouseEvent<HTMLImageElement> & React.WheelEvent<HTMLImageElement>) => {
        let {
            onMouseDown,
            onMouseWheel
        } = this.props;
        const img = evt.target as HTMLImageElement;
        if (evt.type === "mousedown" && isFunc(onMouseDown)) {
            const x = evt.clientX;
            const y = evt.clientY;
            onMouseDown(img, x, y);
        } else if (evt.type === "wheel" && isFunc(onMouseWheel)) {
            const x = evt.nativeEvent.offsetX;
            const y = evt.nativeEvent.offsetY;
            onMouseWheel(img, x, y, evt.deltaY);
        }
    }

    handleMouseUp = () => {
        let { onMouseUp } = this.props;
        if (typeof onMouseUp === "function") {
            onMouseUp();
        }
    }

    handleLoad = () => {
        this.loaded = true;
        this.resize(true);
    }

    handleError = () => {
        this.error = true;
    }

    //fit screen or real size
    resize = (fit: boolean = true) => {
        let {
            loaded,
            error,
            image: { current: img },
            wrapper: { current: wrapper },
            props: { rotateAngle }
        } = this;
        if (loaded && !error) {
            /* let width: number;
            let height: number;
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
            wrapper.style.height = `${height}px`; */
            //after update(width and height of wrapper changed)
            setTimeout(() => {
                calcScale(img, wrapper, fit);
                center(wrapper, img);
            });
        }
    }

    //reset to real size
    reset = () => {
        this.resize(false);
    }

    preventClick = (evt: React.MouseEvent) => {
        evt.preventDefault();
        evt.stopPropagation();
    }

    render() {
        let {
            src,
            imgClass,
            translateX,
            rotateAngle
        } = this.props;
        let style: React.CSSProperties = {
            transform: `rotate(${rotateAngle}deg) translateX(${translateX}px)`,
            left: 0,
            top: 0
        };
        const ww = window.innerWidth;
        const wh = window.innerHeight;
        if (rotateAngle / 90 % 2 !== 0) {
            let dis = (ww - wh) / 2;
            style.left = `${dis}px`;
            style.top = `${-dis}px`;
            style.width = `${wh}px`;
            style.height = `${ww}px`;
        } else {
            style.left = `0px`;
            style.top = `0px`;
            style.width = `${ww}px`;
            style.height = `${wh}px`;
        }
        return (
            <div
                ref={this.wrapper}
                style={style}
                className="img-wrapper transition">
                <img
                    ref={this.image}
                    draggable={false}
                    className={imgClass}
                    onLoad={this.handleLoad}
                    onError={this.handleError}
                    onMouseDown={this.handleMouseEvent}
                    onWheel={this.handleMouseEvent}
                    onMouseUp={this.handleMouseUp}
                    onClick={this.preventClick}
                    src={src} />
                {/* <div className="loading-status">
                    <CircularProgress/>
                </div> */}
            </div>
        );
    }

}