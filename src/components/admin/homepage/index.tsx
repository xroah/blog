import * as React from "react";
import Chart from "chart.js";
import _fetch from "@common/fetch";
import { STATISTICS } from "@common/api";
import { loading } from "@common/loading";

export default class HomePage extends React.Component {

    canvas: React.RefObject<HTMLCanvasElement> = React.createRef();

    componentDidMount() {
        document.title = "首页";
        this.fetchCount();
    }

    fetchCount = async () => {
        loading.show();
        try {
            let ret = await _fetch(STATISTICS);
            this.draw(ret);
        } catch (error) {

        }
        loading.hide();
    }

    draw = (data: any) => {
        let ctx = this.canvas.current.getContext("2d");
        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["文章数量", "评论数量", "相册数量", "照片数量"],
                datasets: [{
                    data: [data.articleCount, data.commentCount, data.albumCount, data.imageCount],
                    backgroundColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)"
                    ],
                    /*borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ], */
                    borderWidth: 0
                }]
            }
        });
    }

    render() {
        return (
            <>
                <canvas ref={this.canvas}></canvas>
            </>
        );
    }
}