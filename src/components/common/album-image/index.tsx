import * as React from "react";
import {
    Button
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Item from "./item";
import NoResult from "@common/no-article";
import {
    RouteComponentProps,
    withRouter
} from "react-router-dom";
import ContextMenu from "./context-menu";
import ImageViewer from "@common/image-viewer";
import { calcPos } from "@common/util";
import "./index.scss";

const WIDTH = 130;
const HEIGHT = 150;

interface Props extends RouteComponentProps {
    isAdmin?: boolean;
    url?: string;
    list: any[];
    started: boolean;
    curAlbum?: any;
    fetchImages?: (id: string) => any;
    emptyImages?: () => any;
}

class AlbumImages extends React.Component<Props> {

    static defaultProps = {
        isAdmin: false
    };

    state = {
        current: null,
        contextMenuPos: {
            left: 0,
            top: 0
        },
        contextMenuVisible: false
    }

    componentDidMount() {
        let {
            match,
            fetchImages,
            curAlbum
        } = this.props;
        fetchImages((match.params as any).id);
        document.title = `相册${curAlbum ? curAlbum.name : ""}`;
    }

    componentWillUnmount() {
        this.props.emptyImages();
    }

    handleContextMenu = (x: number, y: number, image: any) => {
        let {
            left,
            top
        } = calcPos(x, y, WIDTH, HEIGHT);
        this.setState({
            contextMenuPos: {
                left,
                top
            },
            current: image,
            contextMenuVisible: true
        });
        console.log(image);
    }

    handleCover = () => {

    }

    handleDelete = () => {

    }

    handleInfo = () => {

    }

    renderImage() {
        let {
            started,
            list,
            isAdmin
        } = this.props;
        if (list.length) {
            return list.map(
                image => <Item
                    onContextMenu={this.handleContextMenu}
                    isAdmin={isAdmin}
                    key={image._id}
                    image={image} />
            );
        }
        return !started ? <NoResult message="无记录" /> : null;

    }

    hideContextMenu = () => {
        this.setState({
            contextMenuVisible: false
        });
    }

    render() {
        let {
            contextMenuPos: {
                left,
                top
            },
            contextMenuVisible
        } = this.state;
        return (
            <section className="album-images-container">
                <div className="image-list">
                    {this.renderImage()}
                </div>
                <ImageViewer />
                <ContextMenu
                    onHide={this.hideContextMenu}
                    onCover={this.handleCover}
                    onInfo={this.handleInfo}
                    onDelete={this.handleDelete}
                    left={left}
                    top={top}
                    visible={contextMenuVisible} />
                <Button
                    className="add-right-bottom"
                    variant="contained"
                    title="上传图片"
                    color="primary">
                    <Add fontSize="large" />
                </Button>
            </section>
        );
    }

}

export default withRouter(AlbumImages);