import React, { ReactElement, ReactNode } from "react";
import Alert from "reap-ui/lib/Alert";
import CSSTransition from "reap-ui/lib/Common/CSSTransition";
import { createUseStyles } from "react-jss";
import { render, unmountComponentAtNode } from "react-dom";
import noop from "../utils/noop";

const useStyles = createUseStyles({
    "message-item": {
        transition: "all .3s",
        maxWidth: 200,
        marginTop: -30,
        opacity: 0,

        "&.visible": {
            marginTop: 10,
            opacity: 1
        }
    },
});

let uuid = 0;

type Variant = "info" | "success" | "danger"

interface Props {
    visible: boolean;
    variant: Variant;
    onExited: () => void;
    children: ReactNode
}

function Message(props: Props) {
    const {
        visible,
        variant,
        onExited = noop,
        ...rest
    } = props;
    const classes = useStyles();

    return (
        <CSSTransition
            in={visible}
            timeout={300}
            onExited={onExited}
            appear
            unmountOnExit>
            {
                status => {
                    let _class = classes["message-item"];

                    if (status === "entering" || status === "entered") {
                        _class += " visible"
                    }

                    return (
                        <Alert
                            fade={false}
                            variant={variant}
                            className={_class}
                            {...rest} />
                    );
                }
            }
        </CSSTransition>
    );
}

let container: HTMLElement | null;
let map = new Map<number, ReactElement>();

function removeChild(el: HTMLElement) {
    if (el && el.parentNode) {
        el.parentNode.removeChild(el);
    }
}

function factory(v: Variant) {
    return (msg: string) => {
        const _uuid = uuid++;
        const wrapper = document.createElement("div");
        const handleExited = () => {
            map.delete(_uuid);

            removeChild(wrapper);
        };
        const getEl = (visible: boolean) => (
            <Message
                onExited={handleExited}
                visible={visible}
                variant={v}>
                {msg}
            </Message>
        );
        const el = getEl(true);

        if (!container) {
            container = document.createElement("div");

            container.classList.add("message-wrapper");
            document.body.appendChild(container);
        }

        container.appendChild(wrapper);
        render(el, wrapper);
        map.set(_uuid, el);

        setTimeout(() => render(getEl(false), wrapper), 3000);
    };
}

export default {
    destroy() {
        if (!container) return;

        const children = Array.from(container.children);

        for (let child of children) {
            unmountComponentAtNode(child);
            removeChild(child as HTMLElement);
        }

        map = new Map();
    },
    success: factory("success"),
    info: factory("info"),
    error: factory("danger")
}