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
import Property from "./property";
import {
    calcPos,
    eventBus,
    download
} from "@common/util";
import _fetch from "@common/fetch";
import message from "@common/message";
import hint from "@common/hint-dialog";
import {
    ADMIN_IMAGE_URL,
    ADMIN_ALBUM_URL,
    SET_ALBUM_COVER
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
    updateAlbums?: () => any;
    updateImageName?: (id: string, name: string) => any;
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
        curAlbum: {},
        contextMenuVisible: false,
        propertyVisible: false
    }

    componentDidMount() {
        let id = this.getId();
        let {
            fetchImages,
            isAdmin
        } = this.props;
        fetchImages(id);
        if (isAdmin) {
            this.fetchAlbum(id);
            eventBus.on("upload.done", this.handleUploadDone);
        }
    }

    componentWillUnmount() {
        let {
            emptyImages,
            isAdmin
        } = this.props;
        emptyImages();
        if (isAdmin) {
            eventBus.off("upload.done", this.handleUploadDone);
        }
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
            document.title = `相册-${ret.name}`;
            this.setState({
                curAlbum: ret
            });
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

    hideContextMenu = () => {
        this.setState({
            contextMenuVisible: false
        });
    }

    handleCover = async () => {
        let {
            current,
            curAlbum
        } = this.state;
        if (!curAlbum) return message.info("请稍候,正在获取相册信息...");
        try {
            await _fetch(SET_ALBUM_COVER, {
                method: "post",
                body: {
                    albumId: (curAlbum as any)._id,
                    imageId: current._id
                }
            });
            message.success("设置成功!");
            let id = this.getId();
            this.fetchAlbum(id);
            this.props.updateAlbums();
        } catch (err) {

        }
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

    handleDownload = () => {
        let { current } = this.state;
        download(current.relPath);
    }

    handleInfo = () => {
        this.setState({
            propertyVisible: true
        });
    }

    closeInfo = () => {
        this.setState({
            propertyVisible: false
        });
    }

    handleUpload = () => {
        let { curAlbum } = this.state
        if (!curAlbum) {
            return message.info("请稍候,正在获取相册信息...");
        }
        this.props.showUpload(curAlbum);
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
            props: {
                started,
                list,
                isAdmin,
                updateImageName
            },
            state: { curAlbum }
        } = this;
        let coverInfo = (curAlbum as any).coverInfo || {};
        if (list.length) {
            return list.map(
                image => <Item
                    onContextMenu={this.handleContextMenu}
                    onNameChange={updateImageName}
                    isAdmin={isAdmin}
                    isCover={coverInfo._id === image._id}
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
                contextMenuVisible,
                current,
                propertyVisible
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
                    onDownload={this.handleDownload}
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
                <Property
                    visible={propertyVisible}
                    onClose={this.closeInfo}
                    image={current} />
            </section >
        );
    }

}

export default withRouter(AlbumImages);