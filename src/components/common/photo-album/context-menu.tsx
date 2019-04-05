import * as React from "react";
import {
    List,
    ListItem,
    Zoom,
    Typography
} from "@material-ui/core";
import {
    Clear,
    CloudUpload,
    Info,
    Edit
} from "@material-ui/icons";
import hint from "@common/hint-dialog";

interface Props {
    visible?: boolean;
    x?: number;
    y?: number;
    curAlbum?: any;
    hideContextMenu: () => any;
    showEdit: () => any;
    showProperty: () => any;
    delAlbum?: (id: string) => any;
}

interface State {
    left: number;
    top: number;
}

const WIDTH = 130;
const HEIGHT = 200;

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
        if (!this.props.visible) return;
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

    handleEdit = () => {
        this.props.showEdit();
        this.hide();
    }

    handleDel = () => {
        let {
            delAlbum,
            curAlbum
        } = this.props;
        this.hide();
        hint.confirm(
            <>
                确定要删除
                <Typography color="secondary" inline={true}>
                {curAlbum.name}
                </Typography>
                吗?
            </>,
            () => {
                delAlbum(curAlbum._id);
            }
        )
    }

    handleInfo = () => {
        this.hide();
        this.props.showProperty();
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
                            onClick={this.handleEdit}
                            className="menu-item">
                            <Edit />
                            <span>编辑</span>
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