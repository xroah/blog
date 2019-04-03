import * as React from "react";
import { Add } from "@material-ui/icons";
import Item from "@containers/admin/photo-album-item";
import ContextMenu from "@containers/admin/photo-album-context-menu";
import "./index.scss";

interface Props {
    isAdmin?: boolean;
}

export default class PhotoAlbum extends React.Component<Props> {

    static defaultProps = {
        isAdmin: false
    };

    componentDidMount() {
        document.title = "相册";
    }

    render() {
        let {
            props: { isAdmin }
        } = this;
        return (
            <section className="album-container">
                <Item
                    id={null}
                    total={200}
                    isAdmin={isAdmin}
                    name="文章图片" />
                {
                    isAdmin && (
                        <div className="album-item add-album">
                            <Add className="folder-icon" />
                        </div>
                    )
                }
                <ContextMenu/>
            </section>
        );
    }
}