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
    fetchImages?: (id: string, callback: Function) => any;
    emptyImages?: () => any;
    showUpload?: (album: any) => any;
    fetchAlbum?: (id: string) => any;
}

const supportIO = typeof IntersectionObserver === "function";

class AlbumImages extends React.Component<Props> {

    static defaultProps = {
        isAdmin: false
    };
    imageFetched: boolean;
    observer: IntersectionObserver;
    timer: NodeJS.Timeout;

    state = {
        viewerVisible: false,
        curImage: null
    };

    isInViewport = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        return rect.top > 0 &&
            rect.top < window.innerHeight &&
            rect.left > 0 &&
            rect.left < window.innerWidth;
    }

    loadImage = (img: HTMLImageElement) => {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
    }

    scrollLazyLoad = () => {
        const images: HTMLImageElement[] = Array.from(document.querySelectorAll(".image-item img[data-src]"));
        let inVisibleCount = 0;
        if (!images.length) return;
        for (let img of images) {
            if (this.isInViewport(img)) {
                this.loadImage(img);
            } else {
                inVisibleCount++;
                //more then 5 images are invisible, just break;
                if (inVisibleCount > 5) {
                    break;
                }
            }
        }
    }

    handleScroll = () => {
        if (this.timer != undefined) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(this.scrollLazyLoad, 50);
    }

    lazyLoad = () => {
        if (!supportIO) return;
        const images = Array.from(document.querySelectorAll(".image-item img[data-src]"));
        if (!this.observer) {
            this.observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const tgt = entry.target as HTMLImageElement;
                        this.observer.unobserve(tgt);
                        this.loadImage(tgt);
                    }
                });
            });
        }
        images.forEach((img: HTMLImageElement) => this.observer.observe(img));
    }

    componentDidMount() {
        let id = this.getId();
        let {
            fetchImages,
            isAdmin,
            fetchAlbum
        } = this.props;
        fetchImages(id, () => this.imageFetched = true);
        fetchAlbum(id);
        if (isAdmin) {
            eventBus.on("upload.done", this.handleUploadDone);
        }
        if (!supportIO) {
            window.addEventListener("scroll", this.handleScroll);
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
        window.removeEventListener("scroll", this.handleScroll);
    }

    componentDidUpdate() {
        if (this.imageFetched) {
            this.imageFetched = false;
            if (supportIO) {
                this.lazyLoad();
            } else {
                this.scrollLazyLoad();
            }
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
        fetchImages(id, () => this.imageFetched = true);
    }

    handleClickImage = (evt: React.MouseEvent, image: any) => {
        const tgt = evt.target as HTMLImageElement;
        this.setState({
            curImage: image.relPath,
            viewerVisible: true
        });
    }

    closeViewer = () => {
        this.setState({
            viewerVisible: false
        });
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
                    onClick={this.handleClickImage}
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
            curAlbum,
            list
        } = this.props;

        let {
            viewerVisible,
            curImage
        } = this.state;

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
                <ImageViewer
                    images={list}
                    visible={viewerVisible}
                    current={curImage}
                    srcProp="relPath"
                    onClose={this.closeViewer} />
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