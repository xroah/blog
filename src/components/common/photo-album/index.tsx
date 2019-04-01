import * as React from "react";
import { Folder } from "@material-ui/icons";
import ImageViewer from "../image-viewer";
import "./index.scss";

export default class PhotoAlbum extends React.Component {

    componentDidMount() {
        document.title = "相册";
    }

    render() {
        return (
            <section className="album-container">
                <div className="album-item">
                    <dl>
                        <dt>
                            <Folder
                                className="folder-icon"
                                color="primary"
                                fontSize="large" />
                        </dt>
                        <dd>文章图片</dd>
                    </dl>
                </div>
                <ImageViewer />
            </section>
        );
    }
}