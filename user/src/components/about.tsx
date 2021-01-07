import React from "react";
import Helmet from "react-helmet";
import GithubIcon from "./icons/github";
import MailIcon from "./icons/mail";

export default () => (
    <div className="about-wrapper">
        <Helmet>
            <title>关于</title>
        </Helmet>
        <div>
            <h3 className="info-title">关于</h3>
            <div>记录学习，分享技术。</div>
        </div>
        <div className="mt-3">
            <h3 className="info-title">联系我</h3>
            <div className="my-2">
                <GithubIcon />:
                     <a href="https://github.com/xroah" target="_blank">Github</a>
            </div>
            <div>
                <MailIcon />:
                    <a href="mailto:raowanbin@outlook.com">raowanbin@outlook.com</a>
            </div>
        </div>
    </div>
);