import React from "react";
import ToTopIcon from "./icons/arrow-up-circle";
import MessageIcon from "./icons/message-circle";
import { createUseStyles } from "react-jss";
import { throttle } from "reap-ui/lib/utils";
import getScrollTop from "../utils/getScrollTop";
import backToTop from "../utils/backToTop";

interface Props {
    toTopVisible: boolean;
    updateToTopVisibility: (visible: boolean) => void;
    showFeedback: () => void;
}

const useStyle = createUseStyles({
    "right-bottom-icons": {
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        right: 15,
        bottom: 15
    }
});

class RightBottom extends React.Component<Props & { classes: any }> {

    constructor(props: any) {
        super(props);

        this.handleScroll = throttle(this.handleScroll.bind(this));
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleClickFeedback = (evt: React.MouseEvent) => {
        this.props.showFeedback();
        evt.preventDefault();
    };

    handleClickToTop = (evt: React.MouseEvent) => {
        backToTop();
        evt.preventDefault();
    };

    handleScroll() {
        const sTop = getScrollTop();

        this.props.updateToTopVisibility(sTop >= window.innerHeight / 2);
    }

    render() {
        const {
            toTopVisible,
            classes
        } = this.props;

        return (
            <div className={classes["right-bottom-icons"]}>
                {
                    toTopVisible && (
                        <a
                            href="#"
                            title="回到顶部"
                            onClick={this.handleClickToTop}
                            className="mb-2">
                            <ToTopIcon size={32} />
                        </a>
                    )
                }
                <a
                    href="#"
                    title="给博主留言"
                    onClick={this.handleClickFeedback}>
                    <MessageIcon size={32} />
                </a>
            </div>
        );
    }
}

export default function RightBottomWrapper(props: Props) {
    const classes = useStyle();

    return <RightBottom classes={classes} {...props} />;
}