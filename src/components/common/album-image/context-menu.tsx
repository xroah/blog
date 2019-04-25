import * as React from "react";
import {
    Zoom,
    List,
    ListItem,
    Typography
} from "@material-ui/core";
import {
    Clear,
    Info,
    Image,
    SaveAlt
} from "@material-ui/icons";
import {
    calcPos,
    download
} from "@common/util";
import message from "@common/message";
import hint from "@common/hint-dialog";

interface Props {
    visible?: boolean;
    x?: number;
    y?: number;
    curImage?: any;
    curAlbum?: any;
    isCover?: boolean;
    hideContextMenu?: () => any;
    setCover?: (body: any) => any;
    deleteImage?: (id: string) => any;
    showProperty?: () => any;
}

interface State {
    left: number;
    top: number;
}

const WIDTH = 130;
const HEIGHT = 200;

export default class ContextMenu extends React.Component<Props, State> {

    menu: React.RefObject<HTMLDivElement> = React.createRef();

    state = {
        left: 0,
        top: 0
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutSide);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutSide);
    }

    static getDerivedStateFromProps(props: Props, state: State) {
        if (props.x !== state.left || props.y !== state.top) {
            let { left, top } = calcPos(props.x, props.y, WIDTH, HEIGHT);
            state.left = left;
            state.top = top;
        }
        return state;
    }

    handleClickOutSide = (evt: MouseEvent) => {
        let {
            menu: { current: menu },
            props: { visible }
        } = this;
        if (!visible) return;
        let tgt = evt.target as HTMLElement;
        if (tgt !== menu && !menu.contains(tgt)) {
            this.props.hideContextMenu();
        }
    }

    hide = () => {
        this.props.hideContextMenu();
    }

    handleCover = () => {
        let {
            curAlbum,
            curImage,
            setCover,
            isCover
        } = this.props;
        if (!curAlbum) return message.info("请稍候,正在获取相册信息...");
        setCover({
            albumId: curAlbum._id,
            imageId: isCover ? null : curImage._id
        });
        this.hide();
    }

    handleDelete = () => {
        let {
            deleteImage,
            curImage
        } = this.props;
        hint.confirm(
            <>
                确定要删除
                <Typography color="secondary" inline={true}>{curImage.name}</Typography>
                吗?
            </>,
            () => deleteImage(curImage._id)
        );
        this.hide();
    }

    handleDownload = () => {
        download(this.props.curImage.relPath);
        this.hide();
    }

    handleProperty = () => {
        this.props.showProperty();
        this.hide();
    }

    render() {
        let {
            props: {
                visible,
                isCover
            },
            state: {
                left,
                top
            }
        } = this;

        return (
            <Zoom
                in={visible}>
                <div
                    style={{
                        left,
                        top
                    }}
                    ref={this.menu}
                    className="context-menu">
                    <List>
                        <ListItem
                            onClick={this.handleCover}
                            className="menu-item">
                            <Image />
                            <span>{isCover ? "取消封面" : "设为封面"}</span>
                        </ListItem>
                        <ListItem
                            onClick={this.handleDelete}
                            className="menu-item">
                            <Clear />
                            <span>删除</span>
                        </ListItem>
                        <ListItem
                            onClick={this.handleDownload}
                            className="menu-item">
                            <SaveAlt />
                            <span>下载</span>
                        </ListItem>
                        <ListItem
                            onClick={this.handleProperty}
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