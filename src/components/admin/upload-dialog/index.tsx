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
import { UPLOAD_FILE } from "@common/api";
import Item from "./image-item";
import "./index.scss";

let uuid = 0;

export interface UploadItem {
    progress: number;
    id: number;
    file: File,
    started: boolean;
    name: string;
}

export default class UploadDialog extends React.Component {

    fileInput: React.RefObject<HTMLInputElement> = React.createRef();

    state = {
        images: [],
        current: null,
        disabled: false
    };

    handleAdd = () => {
        this.fileInput.current.click();
    }

    unique(images: UploadItem[]) {
        let ret = [];
        let hash = {};
        for (let f of images) {
            let name = f.file.name;
            if (!(name in hash)) {
                hash[name] = true;
                ret.push(f);
            }
        }
        return ret;
    }

    handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(evt.target.files).map(f => ({
            id: uuid++,
            file: f,
            started: false,
            progress: 0,
            name: f.name
        }));
        let { images } = this.state;
        if (!files.length) return;
        images = this.unique(images.concat(files));
        this.setState({
            images
        });
    }

    handleNameChange = (name: string, id: number) => {
        let { images } = this.state;
        for (let img of images) {
            if (img.id === id) {
                img.name = name;
                break;
            }
        }
        this.setState({
            images
        });
    }

    handleDelete = (id: number) => {
        let { images } = this.state;
        for (let i = 0, l = images.length; i < l; i++) {
            let img: UploadItem = images[i];
            if (img.id === id) {
                images.splice(i, 1);
                break;
            }
        }
        this.setState({
            images
        });
    }

    upload = () => {
        const fd = new FormData();
        let { images } = this.state;
        let current: UploadItem = images[0];
        current.started = true;
        fd.append("attachment", current.file);
        fd.append("name", current.name);
        const xhr = new XMLHttpRequest();
        this.setState({
            disabled: true
        });
        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === 4) {
                images.shift();
                if (images.length) {
                    this.setState({
                        images
                    });
                    this.upload();
                } else {
                    this.setState({
                        disabled: false
                    });
                }
            }
        };
        xhr.upload.onprogress = (evt: ProgressEvent) => {
            current.progress = Math.floor(evt.loaded / evt.total);
            images[0] = current;
            this.setState({
                images
            });
        }
        xhr.onerror = () => {
            this.setState({
                disabled: false
            });
        }
        xhr.open("POST", UPLOAD_FILE, true);
        xhr.send(fd);
    }

    renderImage() {
        let { images } = this.state;
        return images.map(
            (img: UploadItem) => <Item
                image={img}
                name={img.name}
                onNameChange={this.handleNameChange}
                onDelete={this.handleDelete}
                key={img.id} />
        );
    }

    render() {
        let { disabled } = this.state;
        return (
            <Dialog
                open={false}
                fullWidth={true}
                maxWidth="md"
                className="upload-dialog"
                PaperProps={{ className: "dialog-wrapper" }}>
                <DialogTitle className="dialog-title">
                    <span>上传图片</span>
                    <IconButton>
                        <Clear fontSize="large" />
                    </IconButton>
                </DialogTitle>
                <DialogContent className="dialog-content">
                    {this.renderImage()}
                </DialogContent>
                <DialogActions className="dialog-actions">
                    <Button
                        onClick={this.upload}
                        variant="contained"
                        disabled={disabled}
                        color="primary">开始上传</Button>
                    <Button
                        onClick={this.handleAdd}
                        variant="contained"
                        disabled={disabled}>添加图片</Button>
                    <input
                        type="file"
                        ref={this.fileInput}
                        className="pick-file-input"
                        accept="image/jpeg,image/png,image/gif"
                        multiple
                        onChange={this.handleFileChange} />
                </DialogActions>
            </Dialog>
        );
    }

}