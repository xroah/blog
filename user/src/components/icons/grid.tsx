//original: https://github.com/feathericons/react-feather/blob/master/src/icons/grid.js
import React from "react";
import Svg, { SvgIconProps } from "./svg";

export default function Grid(props: SvgIconProps) {
    return (
        <Svg {...props}>
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
        </Svg>
    )
}