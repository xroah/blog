//original: https://github.com/feathericons/react-feather/blob/master/src/icons/arrow-up-circle.js
import React from "react";
import Svg, { SvgIconProps } from "./svg";

export default (props: SvgIconProps) => (
    <Svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="16 12 12 8 8 12" />
        <line x1="12" y1="16" x2="12" y2="8" />
    </Svg>
);