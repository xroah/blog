//original: https://github.com/feathericons/react-feather/blob/master/src/icons/frown.js
import React from "react";
import Svg, { SvgIconProps } from "./svg";

export default (props: SvgIconProps) => (
    <Svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
    </Svg>
);