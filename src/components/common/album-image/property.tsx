import * as React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from "@material-ui/core";
import { formatDate } from "@common/util";

interface Props {
    visible?: boolean;
    image?: any;
    hideProperty?: () => any;
}

export default class Property extends React.Component<Props> {

    convertSize = (size?: number | null) => {
        if (size == null) {
            return "未知";
        }
        let _size = Math.floor(size / 1024);
        let mb = 1024 * 1024;
        if (_size > 1024) {
            _size = Math.floor(size / mb);
            return `${_size}.${size % mb}MB`;
        }
        return `${_size}.${size % 1024}KB`;
    }

    render() {
        let {
            visible,
            image,
            hideProperty
        } = this.props;
        if (!image) return null;
        return (
            <Dialog
                maxWidth="xs"
                open={visible}
                className="image-property-dialog">
                <DialogTitle className="dialog-title">{image.name}属性</DialogTitle>
                <DialogContent>
                    <div className="info-row">
                        <span className="label-text">名称:</span>
                        <span className="image-name" title={image.name}>{image.name}</span>
                    </div>
                    <div className="info-row">
                        <span className="label-text">创建时间:</span>
                        <span>{formatDate(image.createTime, "YYYY-MM-DD hh:mm:ss")}</span>
                    </div>
                    <div className="info-row">
                        <span className="label-text">大小:</span>
                        <span>{this.convertSize(image.size)}</span>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideProperty}>关闭</Button>
                </DialogActions>
            </Dialog>
        );
    }
}