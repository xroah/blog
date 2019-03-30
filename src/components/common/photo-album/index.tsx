import * as React from "react";
import ImageViewer from "../image-viewer";

export default class PhotoAlbum extends React.Component {

    componentDidMount() {
        document.title = "相册";
    }

    render() {
        return (
            <section>
                <ImageViewer/>
            </section>
        );
    }
}