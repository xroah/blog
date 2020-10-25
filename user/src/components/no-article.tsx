import React from "react";
import FrownIcon from "./icons/frown";

export default () => (
    <div className="text-center">
        <FrownIcon size={200} color="#ccc" />
        <p className="text-muted mt-3">文章不存在</p>
    </div>
);