import React, { useState, createRef } from "react";
import XIcon from "./icons/x";
import { createUseStyles } from "react-jss";
import CSSTransition from "reap-ui/lib/Common/CSSTransition";
import Button from "reap-ui/lib/Button/Button";
import Spinner from "reap-ui/lib/Spinner";
import message from "./message";
import xhr from "../utils/xhr";
import { FEEDBACK } from "./api";

interface Props {
    visible: boolean;
    hideFeedback: () => void;
    loading: boolean;
    updateLoading: (loading: boolean) => void;
}

const useStyles = createUseStyles({
    "feedback-wrapper": {
        position: "fixed",
        right: 10,
        bottom: 10,
        width: 500,
        maxWidth: "90%",
        zIndex: 999999,
        transition: "all .3s",
        transform: "translateX(120%)",

        "&.visible": {
            transform: "translateX(0)"
        },

        "& .modal-content": {
            boxShadow: "0 0 5px 1px rgba(0, 0, 0, .5)"
        },

        "& .modal-header": {
            alignItems: "center"
        },

        "& textarea": {
            resize: "none"
        },

        "& .mask": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            margin: "auto",
            backgroundColor: "rgba(0, 0, 0, .6)",
            zIndex: 10
        }
    }
});

function saveFeedback(
    data: any,
    onSuccess: () => void,
    onFail: () => void
) {
    if (!data.content) return false;

    return xhr(FEEDBACK, {
        method: "post",
        data,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }).then(() => {
        message.success("保存成功");
        onSuccess();
    }).catch(err => {
        onFail();
        return message.error(err.data ? err.data.msg : err.statusText || err.message);
    });
}

export default function Feedback(props: Props) {
    const classes = useStyles();
    const {
        visible,
        loading,
        hideFeedback,
        updateLoading
    } = props;
    const [email, updateEmail] = useState("");
    const [content, updateContent] = useState("");
    const ref = createRef<HTMLTextAreaElement>();
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
        const target = evt.target;
        const value = target.value;

        if (target.id === "feedbackEmail") {
            updateEmail(value);
        } else {
            updateContent(value);
        }
    };
    const handleOk = () => {
        const ret = saveFeedback(
            {
                email,
                content
            },
            () => {
                updateEmail("");
                updateContent("");
                hideFeedback();
                updateLoading(false);
            },
            () => {
                updateLoading(false);
            }
        );

        if (ret !== false) {
            updateLoading(true);
        } else {
            ref.current?.focus();
        }
    }

    return (
        <CSSTransition
            appear
            in={visible}
            unmountOnExit
            timeout={300}>
            {
                (status) => {
                    let _classes = classes["feedback-wrapper"];

                    if (status === "entering" || status === "entered") {
                        _classes += " visible";
                    }

                    return (
                        <div className={_classes}>
                            {
                                loading && (
                                    <div className="mask">
                                        <Spinner variant="info" animation="border" />
                                    </div>
                                )
                            }
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title">留言</h3>
                                    <button
                                        type="button"
                                        onClick={hideFeedback}
                                        className="close">
                                        <XIcon />
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="feedbackEmail">电子邮箱</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={email}
                                            onChange={handleChange}
                                            placeholder="请输入邮箱，以便回复"
                                            id="feedbackEmail" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="feedbackContent">
                                            <span className="text-danger">*</span>
                                            <span>内容</span>
                                        </label>
                                        <textarea
                                            style={{ height: 100 }}
                                            className="form-control"
                                            ref={ref}
                                            value={content}
                                            maxLength={500}
                                            onChange={handleChange}
                                            id="feedbackContent" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <Button variant="light" onClick={hideFeedback}>取消</Button>
                                    <Button onClick={handleOk}>确定</Button>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </CSSTransition>
    );
}