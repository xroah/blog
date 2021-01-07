import React from "react";
import FrownIcon from "./icons/frown";
import Button from "reap-ui/lib/Button/Button";
import { RouteComponentProps } from "react-router-dom";

export default function Page404(props: RouteComponentProps) {
    const backHome = () => {
        props.history.push("/");
    };

    return (
        <div className="d-flex align-items-center flex-column">
            <FrownIcon size={200} color="#ccc" />
            <p className="mt-3">对不起，您访问的页面不存在</p>
            <Button onClick={backHome}>返回首页</Button>
        </div>
    )
}