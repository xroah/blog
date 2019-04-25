import * as React from "react";
import { Typography } from "@material-ui/core";
import _fetch from "@common/fetch";

const placeholder = require("@images/image.png");

interface Props {
    image?: any;
    isAdmin?: boolean;
    isCover?: boolean;
    showContextMenu?: (x: number, y: number, isCover: boolean) => any;
    switchImage?: (image: any) => any;
    updateName?: (id: string, name: string, callback: Function) => any;
    onClick?: (evt: React.MouseEvent, image: any) => any;
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
            switchImage,
            image,
            showContextMenu,
            isCover
        } = this.props;
        if (!isAdmin) return;
        switchImage(image);
        showContextMenu(evt.clientX, evt.clientY, isCover);
        evt.preventDefault();
        evt.stopPropagation();
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
                updateName
            },
            state: { name }
        } = this;
        if (name === image.name) {
            return this.setState({
                isEdit: false,
                name: ""
            });
        }
        updateName(
            image._id,
            name,
            () => {
                this.setState({
                    isEdit: false
                });
            });
    }

    handleClickImage = (evt: React.MouseEvent) => {
        let { 
            onClick,
            image
         } = this.props;
        if (typeof onClick === "function") {
            onClick(evt, image);
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
                        <img
                            src={placeholder}
                            onClick={this.handleClickImage}
                            data-src={image.relPath} />
                    </dt>
                    <dd className="ellipsis"
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
                    </dd>
                </dl>
            </div>
        );
    }

}