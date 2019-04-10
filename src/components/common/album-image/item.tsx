import * as React from "react";
import { Typography } from "@material-ui/core";

interface Props {
    image?: any;
    isAdmin?: boolean;
    isCover?: boolean;
    onContextMenu?: (x: number, y: number, cur: any) => any;
}

export default class Item extends React.Component<Props> {

    state = {
        isEdit: false,
        name: ""
    };

    handleContextMenu = (evt: React.MouseEvent) => {
        let {
            isAdmin,
            onContextMenu,
            image
        } = this.props;
        if (!isAdmin) return;
        let x = evt.clientX;
        let y = evt.clientY;
        if (typeof onContextMenu === "function") {
            onContextMenu(x, y, image);
        }
        evt.preventDefault();
    }

    render() {

        let {
            state: { isEdit },
            props: {
                image,
                isCover,
                isAdmin
            }
        } = this;
        let name = image.name || image.filename;
        return (
            <div
                className="image-item"
                onContextMenu={this.handleContextMenu}>
                {
                    isCover && isAdmin && (
                        <Typography
                            color="secondary"
                            className="cover-text">封面</Typography>
                    )
                }
                <dl>
                    <dt className="image-wrapper">
                        <img src={image.relPath} />
                    </dt>
                    <dd className="ellipsis">
                        {
                            isEdit ?
                                <input type="text" className="form-control" /> :
                                <span title={name}>{name}</span>
                        }
                    </dd>
                </dl>
            </div>
        );
    }

}