import * as React from "react";
import { CircularProgress } from "@material-ui/core";

export default () => (
    <div className="flex-center" style={{ padding: 10 }}>
        <CircularProgress size={20} />
        <span style={{ marginLeft: 10 }}>正在加载...</span>
    </div>
);