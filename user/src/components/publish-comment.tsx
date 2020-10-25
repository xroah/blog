import React, {useState} from "react";
import Button from "reap-ui/lib/Button/Button";
import noop from "../utils/noop";
import {renderDialog} from "./user-modal";
import message from "./message";

const LOCAL_USER_INFO_KEY = "SAVED_USER_INFO";

interface Props {
    showCancel?: boolean;
    onSuccess?: () => void;
    onCancel?: () => void;
    visible?: boolean;
    replyTo?: string;
    root?: string;
    articleId: string;
    publish: (data: any, onSuccess: () => void, onFail: (error: any) => void) => void;
}

export default function Comment(props: Props) {
    const {
        onCancel = noop,
        onSuccess = noop,
        publish,
        showCancel = false,
        visible = true,
        articleId,
        root,
        replyTo
    } = props;
    const [value, updateValue] = React.useState("");
    const [loading, updateStatus] = useState(false);
    const userInfo = typeof localStorage !== "undefined" ? //undefined on node(SSR)
        JSON.parse(localStorage.getItem(LOCAL_USER_INFO_KEY) as any)
        : null;
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
    const handleInfo = (
        username: string,
        homepage: string,
        remember?: boolean
    ) => {
        const data = {
            username,
            homepage,
            replyTo,
            root,
            articleId,
            content: value
        }

        updateStatus(true);
        _publish(data);

        if (remember) {
            localStorage.setItem(
                LOCAL_USER_INFO_KEY,
                JSON.stringify({username, homepage})
            );
        }
    };
    const _publish = (data: any) => {
        publish(
            data,
            () => {
                updateStatus(false);
                message.success("评论成功");
                updateValue("");
                onSuccess();
            },
            (error: any) => {
                const msg = error.data ? error.data.msg : error.statusText;

                message.error(msg);
                updateStatus(false);
            }
        );
    };

    if (!visible) return null;

    return (
        <div className="mb-3">
            <textarea
                maxLength={150}
                style={{height: 100}}
                ref={ref}
                onChange={handleChange}
                disabled={loading}
                className={`form-control comment-content`}
                placeholder="发表你的评论"
                value={value} />
            <div className="mt-3 d-flex justify-content-end">
                <Button
                    disabled={!value.trim() || loading}
                    onClick={handleOk}>确定</Button>
                {
                    showCancel && (
                        <Button
                            variant="light"
                            onClick={onCancel}
                            disabled={loading}
                            className="ml-2">取消</Button>
                    )
                }
            </div>
        </div>
    )
}