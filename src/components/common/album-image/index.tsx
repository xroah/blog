import * as React from "react";
import {
    Button
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import NoResult from "@common/no-article";
import {
    RouteComponentProps,
    withRouter
} from "react-router-dom";
import Item from "@containers/admin/album-image-item";
import ContextMenu from "@containers/admin/image-context-menu";
import Property from "@containers/admin/image-property";
import ImageViewer from "@common/image-viewer";
import { eventBus } from "@common/util";
import _fetch from "@common/fetch";
import message from "@common/message";
import "./index.scss";

interface Props extends RouteComponentProps {
    isAdmin?: boolean;
    url?: string;
    list: any[];
    started: boolean;
    curAlbum?: any;
    fetchImages?: (id: string) => any;
    emptyImages?: () => any;
    showUpload?: (album: any) => any;
    fetchAlbum?: (id: string) => any;
}

class AlbumImages extends React.Component<Props> {

    static defaultProps = {
        isAdmin: false
    };

    componentDidMount() {
        let id = this.getId();
        let {
            fetchImages,
            isAdmin,
            fetchAlbum
        } = this.props;
        fetchImages(id);
        fetchAlbum(id);
        if (isAdmin) {
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

    handleUpload = () => {
        let {
            curAlbum,
            showUpload
        } = this.props
        if (!curAlbum) {
            return message.info("请稍候,正在获取相册信息...");
        }
        showUpload(curAlbum);
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
            isAdmin,
            curAlbum,
            list,
            started
        } = this.props;
        let coverInfo = curAlbum && curAlbum.coverInfo ? curAlbum.coverInfo : {};
        if (list.length) {
            return list.map(
                image => <Item
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
            isAdmin,
            curAlbum
        } = this.props;

        let docTitle = document.title;
        if (curAlbum && curAlbum.name !== docTitle) {
            document.title = curAlbum.name;
        } else {
            document.title = "相册";
        }

        return (
            <section className="album-images-container">
                <div className="image-list">
                    {this.renderImage()}
                </div>
                <ImageViewer />
                <ContextMenu />
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
                <Property />
            </section >
        );
    }

}

export default withRouter(AlbumImages);