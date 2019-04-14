import * as React from "react";
import { FETCH_DAILY_SENTENCE } from "@common/api";
import _fetch from "@common/fetch";
import Calendar from "@common/calendar";
import "./index.scss";

const github = require("@images/github.png");

export default class RightInfo extends React.Component {

    state = {
        sentence: null
    };

    async componentDidMount() {
        try {
            let ret = await _fetch(FETCH_DAILY_SENTENCE);
            this.setState({
                sentence: ret
            });
        } catch (error) {

        }
    }

    renderSentence() {
        let { sentence } = this.state;
        return sentence ?
            (
                <div className="sentence">
                    <img src={sentence.picture} />
                    <p title={sentence.caption}>{sentence.content}</p>
                </div>
            ) : null;
    }

    render() {
        return (
            <div className="right-info">
                <div className="personal-info">
                    {this.renderSentence()}
                    <div className="social">
                        <a href="//github.com/xroah/blog" target="_blank">
                            <img src={github} />
                        </a>
                    </div>
                </div>
                <Calendar/>
            </div>
        );
    }
}