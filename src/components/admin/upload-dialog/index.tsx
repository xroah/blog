import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton
} from "@material-ui/core";
import {
    Add,
    Clear
} from "@material-ui/icons";
import {UPLOAD_FILE} from "@common/api";
import Item from "./image-item";
import "./index.scss";

export default class UploadDialog extends React.Component {

    fileInput: React.RefObject<HTMLInputElement> = React.createRef();

    state = {
        images: []
    };

    handleAdd = () => {
        this.fileInput.current.click();
    }

    unique(images: File[]) {
        let ret = [];
        let hash = {};
        for (let f of images) {
            let name = f.name;
            if (!(name in hash)) {
                hash[name] = true;
                ret.push(f);
            }
        }
        return ret;
    }

    handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(evt.target.files);
        let {images} = this.state;
        if (!files.length) return;
        images = this.unique(images.concat(files));
        this.setState({
            images
        });
    }

    upload = (file: File) => {
        const fd = new FormData();
        fd.append("attachment", file);
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
        };
        xhr.upload.onprogress = function (evt: ProgressEvent) {
            console.log(evt)
        }
        xhr.open("POST", UPLOAD_FILE, true);
        xhr.send(fd);
    }

    renderImage() {
        let {images} = this.state;
        console.log(images)
        return images.map(
            img => <Item image={img} key={img.name}/>
        );
    }

    render() {
        return (
            <Dialog
                open={true}
                fullWidth={true}
                maxWidth="md"
                className="upload-dialog"
                PaperProps={{className: "dialog-wrapper"}}>
                <DialogTitle className="dialog-title">
                    <span>上传图片</span>
                    <IconButton>
                        <Clear fontSize="large"/>
                    </IconButton>
                </DialogTitle>
                <DialogContent className="dialog-content">
                    {this.renderImage()}
                </DialogContent>
                <DialogActions className="dialog-actions">
                    <Button
                        variant="contained"
                        color="primary">开始上传</Button>
                    <Button
                        onClick={this.handleAdd}
                        variant="contained">添加图片</Button>
                    <input
                        type="file"
                        ref={this.fileInput}
                        className="pick-file-input"
                        accept="image/jpg,image/png,image/gif"
                        multiple
                        onChange={this.handleFileChange}/>
                </DialogActions>
            </Dialog>
        );
    }

}