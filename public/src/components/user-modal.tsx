import React, { useState, createRef } from "react";
import Modal from "reap-ui/lib/Modal";
import { render, unmountComponentAtNode } from "react-dom";
import noop from "../utils/noop";

type Ok = (username: string, homepage: string) => void;
type Cancel = () => void;

interface Props {
    visible: boolean;
    onOk?: Ok,
    onCancel?: Cancel;
    onHidden?: Cancel;
}

export default function UserModal(props: Props) {
    const {
        visible,
        onOk = noop,
        onCancel = noop,
        onHidden = noop
    } = props;
    const usernameRef = createRef<HTMLInputElement>();
    const [username, updateUsername] = useState("");
    const [homepage, updateHomepage] = useState("");
    const handleOk = () => {
        if (!username.trim()) {
            return usernameRef.current?.focus();
        }

        onOk(username, homepage);
    }
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const target = evt.target;
        const id = target.id;
        const value = target.value;

        if (id === "username") {
            updateUsername(value);
        } else {
            updateHomepage(value);
        }
    };

    return (
        <Modal
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            onHidden={onHidden}
            title="个人信息">
            <div className="form-group">
                <label htmlFor="username">
                    <span className="text-danger">*</span>
                    <span>用户名</span>
                </label>
                <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    ref={usernameRef}
                    onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="homepage">主页</label>
                <input
                    type="text"
                    id="homepage"
                    className="form-control"
                    value={homepage}
                    onChange={handleChange} />
            </div>
        </Modal>
    );
}

let container: HTMLElement | null;

export function renderDialog(
    visible: boolean,
    onOk: Ok,
    onCancel: Cancel
) {
    const hideDialog = () => renderDialog(false, onOk, onCancel);
    const handleOk = (username: string, homepage: string) => {
        onOk(username, homepage);
        hideDialog();
    };
    const handleCancel = () => {
        onCancel();
        hideDialog();
    };
    const handleHidden = () => {
        if (!container) return;

        unmountComponentAtNode(container);

        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }

        container = null;
    }

    if (!container) {
        container = document.createElement("div");
        document.body.appendChild(container);
    }

    render(
        <UserModal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            onHidden={handleHidden} />,
        container
    );
}