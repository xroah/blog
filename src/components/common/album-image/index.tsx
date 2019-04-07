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
import ImageViewer from "@common/image-viewer";
import "./index.scss";

interface Props extends RouteComponentProps {
    isAdmin?: boolean;
    url?: string;
    list: any[];
    started: boolean;
    fetchImages?: (id: string) => any;
    emptyImages?: () => any;
}

class AlbumImages extends React.Component<Props> {

    static defaultProps = {
        isAdmin: false
    };

    componentDidMount() {
        let {
            match,
            fetchImages
        } = this.props;
        fetchImages((match.params as any).id);
    }

    componentWillUnmount() {
        this.props.emptyImages();
    }

    renderImage() {
        let {
            started,
            list
        } = this.props;
        if (list.length) {
            return list.map(
                image => <Item key={image._id} image={image} />
            );
        }
        return !started ? <NoResult message="无记录" /> : null;

    }

    render() {
        return (
            <section className="album-images-container">
                <div className="image-list">
                    {this.renderImage()}
                </div>
                <ImageViewer />
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