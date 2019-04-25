import * as React from "react";
import {
    Typography,
    Checkbox
} from "@material-ui/core";
import classnames from "classnames";
import _fetch from "@common/fetch";

const placeholder = require("@images/image.png");

interface Props {
    image?: any;
    isAdmin?: boolean;
    isCover?: boolean;
    showCheck?: boolean;
    showContextMenu?: (x: number, y: number, isCover: boolean) => any;
    switchImage?: (image: any) => any;
    updateName?: (id: string, name: string, callback: Function) => any;
    onClick?: (evt: React.MouseEvent, image: any) => any;
    onCheckChange?: (checked: boolean, id: string) => any;
}

export default class Item extends React.Component<Props> {

    state = {
        isEdit: false,
        checked: false,
        name: ""
    };

    inputEl: React.RefObject<HTMLInputElement> = React.createRef();

    static getDerivedStateFromProps(props: Props, state: any) {
        if (!props.showCheck) {
            state.checked = false;
        }
        return state;
    }

    handleContextMenu = (evt: React.MouseEvent) => {
        let {
            isAdmin,
            switchImage,
            image,
            showContextMenu,
            isCover,
            showCheck
        } = this.props;
        if (!isAdmin || showCheck) return;
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

    handleCheckChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const checked = evt.target.checked;
        this.setState({
            checked
        });
        this.fireChange(checked);
    }

    handleClickCheck = () => {
        let { checked } = this.state;
        checked = !checked;
        this.setState({
            checked
        });
        this.fireChange(checked);
    }

    fireChange = (checked: boolean) => {
        const {
            image,
            onCheckChange } = this.props;
        if (typeof onCheckChange === "function") {
            onCheckChange(checked, image._id);
        }
    }

    stopPropagation = (evt: React.MouseEvent) => {
        evt.stopPropagation();
    }

    render() {

        let {
            state: {
                isEdit,
                name,
                checked
            },
            props: {
                image,
                isCover,
                isAdmin,
                showCheck
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
                <div className="image-wrapper flex-center">
                    <img
                        src={placeholder}
                        onClick={this.handleClickImage}
                        data-src={image.relPath} />
                    {
                        showCheck && (
                            <div className="check-item" onClick={this.handleClickCheck}>
                                <Checkbox
                                    className="checkbox"
                                    color="secondary"
                                    checked={checked}
                                    onClick={this.stopPropagation}
                                    onChange={this.handleCheckChange} />
                            </div>
                        )
                    }
                </div>
                <div className="ellipsis image-name"
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
            </div>
        );
    }

}