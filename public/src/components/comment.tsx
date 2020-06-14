import React from "react";
import Button from "reap-ui/lib/Button";
import { createUseStyles } from "react-jss";
import noop from "../utils/noop";

interface Props {
    onOk?: (value: string) => void;
}

const useStyles = createUseStyles({
    "comment-content": {
        resize: "none"
    }
});

export default function Comment(props: Props) {
    const {
        onOk = noop
    } = props;
    const [value, updateValue] = React.useState("");
    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateValue(evt.target.value);
    };
    const ref = React.createRef<HTMLTextAreaElement>();
    const handleClick = () => {
        if (!value.trim()) {
            return ref.current?.focus();
        }

        onOk(value);
    };
    const classes = useStyles();

    return (
        <div className="mb-3">
            <textarea
                style={{ height: 100 }}
                ref={ref}
                onChange={handleChange}
                className={`form-control ${classes["comment-content"]}`}
                placeholder="发表你的评论" />
            <div className="mt-3 d-flex justify-content-end">
                <Button
                    disabled={!value.trim()}
                    onClick={handleClick}>确定</Button>
            </div>
        </div>
    )
}