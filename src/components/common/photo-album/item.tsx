import * as React from "react";
import {
    withRouter,
    RouteComponentProps
} from "react-router-dom";

const defaultCover = require("@images/default_cover.png");

interface Props extends RouteComponentProps {
    isAdmin?: boolean;
    album?: any;
    cover?: any;
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
            album,
            switchAlbum
        } = this.props;
        let url = "/photo-album";
        if (isAdmin) {
            url = "/xsys/photo-album";
            switchAlbum(album);
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
        evt.stopPropagation();
    }

    render() {
        let {
            album,
            cover
        } = this.props;
        let src = defaultCover;
        if (cover) {
            src = cover.relPath;
        }
        return (
            <>
                <div
                    onClick={this.handleClick}
                    onContextMenu={this.handleContextmenu}
                    className="album-item">
                    <dl>
                        <dt className="img-wrapper">
                            <img src={src} />
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