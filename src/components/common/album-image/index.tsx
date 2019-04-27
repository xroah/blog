import * as React from "react";
import {
    Button,
    Toolbar,
    Typography
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
import hint from "@common/hint-dialog";
import InlineLoading from '@common/inline-loading';
import { DOWNLOAD_IMAGES } from "@common/api";
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
    delImages: (id: string[], success: Function) => any;
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
        curImage: null,
        checkedImages: [],
        showCheck: false
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

    handleCheckChange = (checked: boolean, id: string) => {
        let { checkedImages } = this.state;
        let index = checkedImages.indexOf(id);
        if (checked) {
            if (index === -1) {
                checkedImages.push(id);
            }
        } else {
            if (index >= 0) {
                checkedImages.splice(index, 1);
            }
        }
        this.setState({
            checkedImages
        });
    }

    toggleCheck = () => {
        let {
            showCheck,
            checkedImages
        } = this.state;
        showCheck = !showCheck;
        if (!showCheck) {
            checkedImages = [];
        }
        this.setState({
            showCheck,
            checkedImages
        });
    }

    checkAll = () => {
        let {
            state: { checkedImages },
            props: { list }
        } = this;
        if (checkedImages.length !== list.length) {
            checkedImages = list.map(img => img._id);
        } else {
            checkedImages = [];
        }
        this.setState({
            checkedImages
        });
    }

    handleDel = () => {
        let { checkedImages } = this.state;
        hint.confirm(
            "确定要删除这些图片吗?",
            () => this.props.delImages(checkedImages, () => {
                this.setState({
                    checkedImages: [],
                    showCheck: false
                });
            })
        );
    }

    download = () => {
        let {
            state: { checkedImages },
            props: { curAlbum }
        } = this;
        if (!checkedImages.length) {
            return message.error("请选择图片!");
        }
        let url = `${DOWNLOAD_IMAGES}?ids=${JSON.stringify(checkedImages)}`;
        if (curAlbum) {
            url += `&name=${curAlbum.name}`;
        }
        window.open(url, "_blank");
    }

    renderImage() {
        let {
            isAdmin,
            curAlbum,
            list,
            started
        } = this.props;
        let { checkedImages } = this.state;
        let coverInfo = curAlbum && curAlbum.coverInfo ? curAlbum.coverInfo : {};
        if (list.length) {
            return list.map(
                image => <Item
                    key={image._id}
                    onClick={this.handleClickImage}
                    isAdmin={isAdmin}
                    checked={checkedImages.indexOf(image._id) >= 0}
                    isCover={coverInfo._id === image._id}
                    onCheckChange={this.handleCheckChange}
                    showCheck={this.state.showCheck}
                    image={image} />
            );
        }
        return !started ? <NoResult message="无记录" /> : null;
    }

    render() {
        let {
            isAdmin,
            curAlbum,
            list,
            started
        } = this.props;

        let {
            viewerVisible,
            curImage,
            checkedImages,
            showCheck
        } = this.state;

        let checkedNum = checkedImages.length;

        if (curAlbum && curAlbum.name) {
            document.title = curAlbum.name;
        } else {
            document.title = "相册";
        }

        return (
            <section className="album-images-container">
                {
                    !!list.length && (
                        <Toolbar variant="dense" className="image-toolbar">
                            {!!checkedNum && (
                                <Typography color="secondary">
                                    {checkedNum}
                                </Typography>
                            )}
                            <div className="btns">
                                {
                                    isAdmin && !!checkedNum && (
                                        <Button
                                            onClick={this.handleDel}
                                            variant="contained"
                                            color="secondary">
                                            删除
                                        </Button>
                                    )
                                }
                                {
                                    showCheck && (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.download}>
                                                下载
                                            </Button>
                                            <Button
                                                onClick={this.checkAll}
                                                variant="contained"
                                                color="primary">
                                                {list.length === checkedImages.length ? "取消全选" : "全选"}
                                            </Button>
                                        </>
                                    )
                                }
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.toggleCheck}>
                                    {showCheck ? "取消" : "选择"}
                                </Button>
                            </div>
                        </Toolbar>
                    )
                }
                <div className="image-list">
                    {this.renderImage()}
                </div>
                {started && <InlineLoading />}
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