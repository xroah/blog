import * as React from "react";
import {
    Folder
} from "@material-ui/icons";

interface Props {
    isAdmin?: boolean;
    album?: any;
    showContextMenu?: (x: number, y: number) => any;
    switchAlbum: (album: any) => any;
}

export default class Item extends React.Component<Props> {

    static defaultProps = {
        isAdmin: false,
        showBtn: true
    };

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
                    onContextMenu={this.handleContextmenu}
                    className="album-item">
                    <dl>
                        <dt>
                            <Folder
                                className="folder-icon"
                                color="primary"
                                fontSize="large" />
                        </dt>
                        <dd className="album-name">{album.name}</dd>
                        <dd className="img-num">
                            {album.images ? album.images.count : 0}张
                        </dd>
                    </dl>
                </div>

            </>
        );
    }
}