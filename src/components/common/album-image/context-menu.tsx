import * as React from "react";
import {
    Zoom,
    List,
    ListItem
} from "@material-ui/core";
import {
    Clear,
    Info,
    Image
} from "@material-ui/icons";

interface Props {
    visible: boolean;
    left?: number;
    top?: number;
    onDelete?: () => any;
    onInfo?: () => any;
    onCover?: () => any;
    onHide: () => any;
}

export default class ContextMenu extends React.Component<Props> {

    menu: React.RefObject<HTMLDivElement> = React.createRef();

    componentDidMount() {
        document.addEventListener("click", this.handleClickOutSide);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutSide);
    }

    handleClickOutSide = (evt: MouseEvent) => {
        let {
            menu: { current: menu },
            props: {visible}
        } = this;
        if (!visible) return; 
        let tgt = evt.target as HTMLElement;
        if (tgt !== menu || !menu.contains(tgt)) {
            this.props.onHide();
        }
    }

    handleCover = () => {
        this.props.onHide();
        this.props.onCover();
    }

    handleInfo = () => {
        this.props.onInfo();
        this.props.onHide();
    }

    handleDelete = () => {
        this.props.onHide();
        this.props.onDelete();
    }

    render() {
        let {
            visible,
            left,
            top
        } = this.props;

        return (
            <Zoom
                style={{
                    left,
                    top
                }}
                in={visible}>
                <div
                    ref={this.menu}
                    className="context-menu">
                    <List>
                        <ListItem
                            onClick={this.handleCover}
                            className="menu-item">
                            <Image />
                            <span>设为封面</span>
                        </ListItem>
                        <ListItem
                            onClick={this.handleDelete}
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