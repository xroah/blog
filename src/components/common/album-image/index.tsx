import * as React from "react";
import {
    Button, Typography
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
import {
    calcPos,
    eventBus
} from "@common/util";
import _fetch from "@common/fetch";
import message from "@common/message";
import hint from "@common/hint-dialog";
import {
    ADMIN_IMAGE_URL,
    ADMIN_ALBUM_URL
} from "@common/api";
import "./index.scss";

const WIDTH = 130;
const HEIGHT = 150;

interface Props extends RouteComponentProps {
    isAdmin?: boolean;
    url?: string;
    list: any[];
    started: boolean;
    fetchImages?: (id: string) => any;
    emptyImages?: () => any;
    showUpload?: (album: any) => any;
    deleteImageById?: (id: string) => any;
}

class AlbumImages extends React.Component<Props> {

    static defaultProps = {
        isAdmin: false
    };

    curAlbum: any;

    state = {
        current: null,
        contextMenuPos: {
            left: 0,
            top: 0
        },
        contextMenuVisible: false
    }

    componentDidMount() {
        let id = this.getId();
        this.props.fetchImages(id);
        this.fetchAlbum(id);
        eventBus.on("upload.done", this.handleUploadDone);
    }

    componentWillUnmount() {
        this.props.emptyImages();
        eventBus.off("upload.done", this.handleUploadDone);
    }

    getId = () => {
        let {
            match
        } = this.props;
        let id: string = (match.params as any).id;
        return id;
    }

    fetchAlbum = async (id: string) => {
        try {
            let ret: any = await _fetch(`${ADMIN_ALBUM_URL}?id=${id}`);
            this.curAlbum = ret;
            document.title = `相册-${ret.name}`;
        } catch (err) {

        }
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
        let { current } = this.state;
        hint.confirm(
            <>
                确定要删除
                <Typography color="secondary" inline={true}>{current.name}</Typography>
                吗?
            </>,
            async () => {
                try {
                    await _fetch(ADMIN_IMAGE_URL, {
                        method: "delete",
                        body: {
                            id: current._id
                        }
                    });
                    this.props.deleteImageById(current._id);
                    message.success("上传成功!");
                } catch (error) {

                }
            }
        )
    }

    handleInfo = () => {

    }

    hideContextMenu = () => {
        this.setState({
            contextMenuVisible: false
        });
    }

    handleUpload = () => {
        if (!this.curAlbum) {
            return message.info("请稍后...");
        }
        this.props.showUpload(this.curAlbum);
    }

    handleUploadDone = () => {
        let {
            emptyImages,
            fetchImages
        } = this.props;
        let id = this.getId();
        emptyImages();
        fetchImages(id);
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

    render() {
        let {
            state: {
                contextMenuPos: {
                    left,
                    top
                },
                contextMenuVisible
            },
            props: { isAdmin }
        } = this;

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
                {
                    isAdmin && (
                        <Button
                            onClick={this.handleUpload}
                            className="add-right-bottom"
                            variant="contained"
                            title="上传图片"
                            color="primary">
                            <Add fontSize="large" />
                        </Button>
                    )
                }
            </section >
        );
    }

}

export default withRouter(AlbumImages);