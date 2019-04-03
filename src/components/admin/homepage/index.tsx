import * as React from "react";

export default class HomePage extends React.Component {
    
    componentDidMount() {
        document.title = "首页";
    }

    render() {
        return (
            <section>
                主页
            </section>
        );
    }
}