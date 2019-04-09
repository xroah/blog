import * as React from "react";

interface Props {
    image?: any;
    isAdmin?: boolean;
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
            props: { image }
        } = this;
        let name = image.name || image.filename;
        return (
            <div
                className="image-item"
                onContextMenu={this.handleContextMenu}>
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