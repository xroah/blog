import * as React from "react";
import {
    Folder
} from "@material-ui/icons";
import {
    withRouter,
    RouteComponentProps
} from "react-router-dom";

interface Props extends RouteComponentProps {
    isAdmin?: boolean;
    album?: any;
    showContextMenu?: (x: number, y: number) => any;
    switchAlbum: (album: any) => any;
}

class Item extends React.Component<Props> {

    static defaultProps = {
        isAdmin: false,
        showBtn: true
    };

    handleClick = () => {
        let {
            history,
            isAdmin,
            album
        } = this.props;
        let url = "/photo-album";
        if (isAdmin) {
            url = "/xsys/photo-album";
        }
        history.push(`${url}/${album._id}`);
    }

    handleContextmenu = (evt: React.MouseEvent) => {
        let x = evt.clientX;
        let y = evt.clientY;
        let {
            isAdmin,
            showContextMenu,
            album,
            switchAlbum
        } = this.props;
        if (!isAdmin) return;
        showContextMenu(x, y);
        switchAlbum(album);
        evt.preventDefault();
    }

    render() {
        let { album } = this.props;

        return (
            <>
                <div
                    onClick={this.handleClick}
                    onContextMenu={this.handleContextmenu}
                    className="album-item">
                    <dl>
                        <dt>
                            <Folder
                                className="folder-icon"
                                color="primary"
                                fontSize="large" />
                        </dt>
                        <dd className="album-name ellipsis">{album.name}</dd>
                        <dd className="img-num">
                            {album.images ? album.images.count : 0}张
                        </dd>
                    </dl>
                </div>

            </>
        );
    }
}

export default withRouter(Item);