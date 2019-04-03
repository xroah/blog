import * as React from "react";
import {
    Folder
} from "@material-ui/icons";

interface Props {
    isAdmin?: boolean;
    name: string;
    id: string | null;
    showBtn?: boolean;
    total: number;
    showContextMenu?: (x: number, y: number) => any;
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
            showContextMenu
        } = this.props;
        if (!isAdmin) return;
        showContextMenu(x, y);
        evt.preventDefault();
    }

    render() {
        let {
            name,
            total,
            isAdmin
        } = this.props;

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
                        <dd className="album-name">{name}</dd>
                        <dd className="img-num">{total}张</dd>
                    </dl>
                </div>
                
            </>
        );
    }
}