import * as React from "react";
import {
    IconButton,
    LinearProgress
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { UploadItem } from "./index";

interface Props {
    image: UploadItem;
    name: string;
    onNameChange?: (name: string, id: number) => any;
    onDelete?: (id: number) => any;
}

export default class ImageItem extends React.Component<Props> {

    imgEl: React.RefObject<HTMLImageElement> = React.createRef();

    handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let { onNameChange, image } = this.props;
        if (typeof onNameChange === "function") {
            onNameChange(evt.target.value, image.id);
        }
    }

    handleDelete = () => {
        let { onDelete, image } = this.props;
        if (typeof onDelete === "function") {
            onDelete(image.id);
        }
    }

    render() {
        let src: string;
        let {
            props: { image, name },
            handleChange,
            handleDelete
        } = this;
        if (image) {
            src = URL.createObjectURL(image.file);
        }
        return (
            <div className="upload-image-item uploading">
                <dl>
                    <dt className="img-wrapper">
                        <img ref={this.imgEl} src={src} />
                    </dt>
                    <dd>
                        <input
                            type="text"
                            value={name}
                            onChange={handleChange}
                            className="form-control" />
                    </dd>
                </dl>
                {
                    image.started ? (
                        <div className="progress-wrapper">
                            <span>{image.progress}%</span>
                            <LinearProgress
                                value={image.progress}
                                variant="determinate"
                                color="primary" />
                        </div>
                    ) : null
                }
                <IconButton
                    color="secondary"
                    className="del-image"
                    onClick={handleDelete}>
                    <Clear />
                </IconButton>
            </div>
        );
    }

}