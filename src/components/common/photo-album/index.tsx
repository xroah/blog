import * as React from "react";
import { Add } from "@material-ui/icons";
import Item from "@containers/admin/photo-album-item";
import ContextMenu from "@containers/admin/album-context-menu";
import AlbumDialog from "@containers/admin/album-dialog";
import AlbumProperty from "@containers/admin/album-property";
import InlineLoading from "@common/inline-loading";
import "./index.scss";

interface Props {
    isAdmin?: boolean;
    url?: string;
    list?: Array<any>;
    loading?: boolean;
    fetchAlbums: () => any;
    showEdit: () => any;
}

export default class PhotoAlbum extends React.Component<Props> {

    static defaultProps = {
        isAdmin: false
    };

    componentDidMount() {
        let {
            list,
            fetchAlbums
        } = this.props;
        document.title = "相册";
        if (!list.length) {
            fetchAlbums();
        }
    }

    handleClick = () => {
        this.props.showEdit();
    }

    render() {
        let {
            props: {
                isAdmin,
                list,
                loading
            },
            handleClick
        } = this;
        if (loading) {
            return <InlineLoading/>;
        }
        return (
            <section className="album-container">
                {
                    list.map(
                        album => (
                            <Item
                                key={album._id}
                                album={album}
                                cover={album.coverInfo}
                                isAdmin={isAdmin} />
                        )
                    )
                }
                {
                    isAdmin && (
                        <>
                            <div
                                title="新增相册"
                                onClick={handleClick}
                                className="album-item add-album">
                                <Add className="folder-icon" />
                            </div>
                            <AlbumDialog />
                            <AlbumProperty />
                        </>
                    )
                }
                <ContextMenu />
            </section>
        );
    }
}