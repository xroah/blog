import React, { useState } from "react";
import Button from "reap-ui/lib/Button";
import { createUseStyles } from "react-jss";
import noop from "../utils/noop";
import { renderDialog } from "./user-modal";
import message from "./message";

const LOCAL_USER_INFO_KEY = "SAVED_USER_INFO";

interface Props {
    showCancel?: boolean;
    onCancel?: () => void;
    visible?: boolean;
    replyTo?: string;
    root?: string;
    articleId: string;
    publishing: boolean;
    publish: (data: any, onSuccess: () => void, onFail: (error: any) => void) => void;
}

const useStyles = createUseStyles({
    "comment-content": {
        resize: "none"
    }
});

export default function Comment(props: Props) {
    const {
        onCancel = noop,
        showCancel = false,
        visible = true,
        publish,
        articleId,
        root,
        replyTo,
        publishing
    } = props;
    const [value, updateValue] = React.useState("");
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_USER_INFO_KEY) as any);
    const ref = React.createRef<HTMLTextAreaElement>();
    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateValue(evt.target.value);
    };
    const handleOk = () => {
        if (!value.trim()) {
            return ref.current?.focus();
        }

        if (!userInfo) {
            renderDialog(true, handleInfo, noop);
        } else {
            handleInfo(userInfo.username, userInfo.homepage);
        }
    };
    const handleInfo = (username: string, homepage: string) => {
        const data = {
            username,
            homepage,
            replyTo,
            root,
            articleId,
            content: value
        }

        _publish(data);
        localStorage.setItem(
            LOCAL_USER_INFO_KEY,
            JSON.stringify({ username, homepage })
        );
    };
    const _publish = (data: any) => {
        publish(
            data,
            () => {
                
            },
            (error: any) => { 
                const msg = error.data ? error.data.msg : error.statusText;

                message.error(msg);
             }
        );
    }
    const classes = useStyles();

    if (!visible) return null;

    return (
        <div className="mb-3">
            <textarea
                style={{ height: 100 }}
                ref={ref}
                onChange={handleChange}
                disabled={publishing}
                className={`form-control ${classes["comment-content"]}`}
                placeholder="发表你的评论" />
            <div className="mt-3 d-flex justify-content-end">
                <Button
                    disabled={!value.trim() || publishing}
                    onClick={handleOk}>确定</Button>
                {
                    showCancel && (
                        <Button
                            variant="light"
                            onClick={onCancel}
                            disabled={publishing}
                            className="ml-2">取消</Button>
                    )
                }
            </div>
        </div>
    )
}