import * as React from "react";
import {
    List,
    ListItem,
    Zoom
} from "@material-ui/core";
import {
    Clear,
    CloudUpload,
    Info
} from "@material-ui/icons";

interface Props {
    visible?: boolean;
    x?: number;
    y?: number;
    hideContextMenu: () => any;
}

interface State {
    left: number;
    top: number;
}

const WIDTH = 130;
const HEIGHT = 150;

function calcPos(x: number, y: number) {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let left = x;
    let top = y;
    if (w - x < WIDTH) {
        left = x - WIDTH;
    }
    if (h - y < HEIGHT) {
        top = y - h;
    }
    return {
        left,
        top
    };
}

export default class ContextMenu extends React.Component<Props, State> {

    state = {
        left: 0,
        top: 0
    };

    menu: React.RefObject<HTMLDivElement> = React.createRef();

    componentDidMount() {
        document.addEventListener("click", this.handleClickOutSide);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutSide);
    }

    static getDerivedStateFromProps(props: Props, state: State) {
        let _state = { ...state };
        if (props.x !== state.left || props.y !== state.top) {
            let { left, top } = calcPos(props.x, props.y);
            _state.left = left;
            _state.top = top;
        }
        return _state;
    }

    handleClickOutSide = (evt: MouseEvent) => {
        let tgt = evt.target as HTMLElement;
        let root = this.menu.current;
        if (tgt !== root && !root.contains(tgt)) {
            this.hide();
        }
        evt.stopPropagation();
    }

    hide = () => {
        this.props.hideContextMenu();
    }

    handleUpload = () => {
        this.hide();
    }

    handleDel = () => {
        this.hide();
    }

    handleInfo = () => {
        this.hide();
    }

    render() {
        let {
            props: { visible },
            state: {
                left,
                top
            }
        } = this;

        return (
            <Zoom
                style={{
                    left,
                    top
                }}
                in={visible}>
                <div ref={this.menu} className="context-menu">
                    <List>
                        <ListItem
                            onClick={this.handleUpload}
                            className="menu-item">
                            <CloudUpload />
                            <span>上传图片</span>
                        </ListItem>
                        <ListItem
                            onClick={this.handleDel}
                            className="menu-item">
                            <Clear />
                            <span>删除</span>
                        </ListItem>
                        <ListItem
                            onClick={this.handleInfo}
                            className="menu-item">
                            <Info />
                            <span>属性</span>
                        </ListItem>
                    </List>
                </div>
            </Zoom>
        );
    }
}