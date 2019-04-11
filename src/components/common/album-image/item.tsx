import * as React from "react";
import { Typography } from "@material-ui/core";
import { ADMIN_IMAGE_URL } from "@common/api";
import _fetch from "@common/fetch";
import message from "@common/message";

interface Props {
    image?: any;
    isAdmin?: boolean;
    isCover?: boolean;
    onContextMenu?: (x: number, y: number, cur: any) => any;
    onNameChange?: (id: string, name: string) => any;
}

export default class Item extends React.Component<Props> {

    state = {
        isEdit: false,
        name: ""
    };

    inputEl: React.RefObject<HTMLInputElement> = React.createRef();

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

    handleEdit = () => {
        let {
            image,
            isAdmin
        } = this.props;
        if (!isAdmin) return;
        this.setState({
            name: image.name || image.filename,
            isEdit: true
        });
        setTimeout(() => {
            let input = this.inputEl.current;
            input && input.focus();
        });
    }

    handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: evt.target.value
        });
    }

    handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        let key = evt.key.toLowerCase();
        let { name } = this.state;
        if (key === "enter") {
            if (!name.trim()) return;
            this.saveName();
        } else if (key === "esc" || key === "escape") {
            this.setState({
                isEdit: false,
                name: ""
            });
        }
    }

    handleBlur = () => {
        let { name } = this.state;
        this.setState({
            isEdit: false
        });
        if (name) {
            this.saveName();
        }
    }

    saveName = async () => {
        let {
            props: {
                image,
                onNameChange
            },
            state: { name }
        } = this;
        if (name === image.name) {
            return this.setState({
                isEdit: false,
                name: ""
            });
        }
        try {
            await _fetch(ADMIN_IMAGE_URL, {
                method: "put",
                body: {
                    id: image._id,
                    name
                }
            });
        } catch (err) {
            return err;
        }

        message.success("保存成功!");
        this.setState({
            isEdit: false
        });
        if (typeof onNameChange === "function") {
            onNameChange(image._id, name);
        }
    }

    render() {

        let {
            state: {
                isEdit,
                name
            },
            props: {
                image,
                isCover,
                isAdmin
            }
        } = this;
        let imageName = image.name || image.filename;
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
                    <dd>
                        <div
                            className="ellipsis"
                            style={{ overflow: isEdit ? "visible" : "hidden" }}>
                            {
                                isEdit ?
                                    <input
                                        type="text"
                                        ref={this.inputEl}
                                        value={name}
                                        onKeyDown={this.handleKeyDown}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        className="form-control" /> :
                                    <span
                                        onClick={this.handleEdit}
                                        title={imageName}>{imageName}</span>
                            }
                        </div>
                    </dd>
                </dl>
            </div>
        );
    }

}