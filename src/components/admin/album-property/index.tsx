import * as React from "react";
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Button
} from "@material-ui/core";
import { formatDate } from "@common/util";

interface Props {
    visible?: boolean;
    curAlbum: any;
    hideProperty: () => any;
}

export default class AlbumProperty extends React.Component<Props> {

    render() {
        let {
            visible,
            curAlbum,
            hideProperty
        } = this.props;
        if (!curAlbum) {
            return null;
        }
        return (
            <Dialog
                open={visible}
                className="album-property-dialog">
                <DialogTitle className="text-center">
                    {curAlbum.name}属性
                </DialogTitle>
                <DialogContent>
                    <div className="info-row">
                        <span className="label-text">相册名称</span>
                        <span className="details">
                            {curAlbum.name}
                        </span>
                    </div>
                    <div className="info-row">
                        <span className="label-text">相册描述</span>
                        <span className="details">
                            {curAlbum.desc}
                        </span>
                    </div>
                    <div className="info-row">
                        <span className="label-text">创建时间</span>
                        <span className="details">
                            {curAlbum.createTime ? formatDate(curAlbum.createTime) : "未知"}
                        </span>
                    </div>
                    <div className="info-row">
                        <span className="label-text">仅自己可见</span>
                        <span className="details">
                            {curAlbum.secret ? "是" : "否"}
                        </span>
                    </div>
                    <div className="info-row">
                        <span className="label-text">照片数量</span>
                        <span className="details">
                            {curAlbum.images ? curAlbum.images.count : 0}
                        </span>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideProperty}>关闭</Button>
                </DialogActions>
            </Dialog>
        );
    }

}