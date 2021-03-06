import React from "react";
import ToTopIcon from "./icons/arrow-up-circle";
// import MessageIcon from "./icons/message-circle";
import throttle from "reap-ui/lib/utils/throttle";
import getScrollTop from "../utils/get-scroll-top";
import backToTop from "../utils/back-to-top";

interface Props {
    toTopVisible: boolean;
    updateToTopVisibility: (visible: boolean) => void;
    showFeedback: () => void;
}

export default class RightBottom extends React.Component<Props> {
    private cancel: Function | null = null;

    constructor(props: any) {
        super(props);

        this.handleScroll = throttle(this.handleScroll.bind(this));
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("wheel", this.cancelScroll);
        window.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("wheel", this.cancelScroll);
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleClickFeedback = (evt: React.MouseEvent) => {
        this.props.showFeedback();
        evt.preventDefault();
    };

    handleClickToTop = (evt: React.MouseEvent) => {
        this.cancel = backToTop(() => this.cancel = null);

        evt.preventDefault();
        evt.stopPropagation();
    };

    handleKeyDown = (evt: KeyboardEvent) => {
        if (!this.cancel) return;

        const key = evt.key.toLowerCase();
        const keySet = new Set(["arrowup", "arrowdown"]);

        if (keySet.has(key)) {
            this.cancelScroll();
        }
    }

    cancelScroll = () => {
        if (this.cancel) {
            this.cancel();
        }
    }

    handleScroll() {
        const sTop = getScrollTop();

        this.props.updateToTopVisibility(sTop >= window.innerHeight / 2);
    }

    render() {
        const {
            toTopVisible
        } = this.props;

        return (
            <div className="right-bottom-icons">
                {
                    <a
                        href="#"
                        title="回到顶部"
                        onClick={this.handleClickToTop}
                        className={`back-to-top ${toTopVisible ? " visible" : ""}`}>
                        <ToTopIcon size={32} />
                    </a>
                }
                {/* <a
                    href="#"
                    title="给博主留言"
                    onClick={this.handleClickFeedback}>
                    <MessageIcon size={32} />
                </a> */}
            </div>
        );
    }
}