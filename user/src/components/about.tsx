import React from "react";
import { createUseStyles } from "react-jss";
import GithubIcon from "./icons/github";
import MailIcon from "./icons/mail";

const useStyle = createUseStyles({
    "info-title": {
        paddingBottom: 5,
        borderBottom: "1px solid #ccc"
    }
});

export default () => {
    const classes = useStyle();

    return (
        <>
            <div>
                <h3 className={classes["info-title"]}>关于</h3>
                <div>记录学习，分享技术。</div>
            </div>
            <div className="mt-3">
                <h3 className={classes["info-title"]}>联系我</h3>
                <div className="my-2">
                    <GithubIcon/>:
                     <a href="https://github.com/xroah" target="_blank">Github</a>
                </div>
                <div>
                    <MailIcon/>:
                    <a href="mailto:raowanbin@outlook.com">raowanbin@outlook.com</a>
                </div>
            </div>
        </>
    );
};