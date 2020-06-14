//https://github.com/feathericons/react-feather/blob/master/src/icons/chevron-left.js
import React from "react";
import Svg, { SvgIconProps } from "./svg";

export default function ChevronsLeft(props: SvgIconProps) {
    return (
        <Svg {...props}>
             <polyline points="15 18 9 12 15 6" />
        </Svg>
    );
}