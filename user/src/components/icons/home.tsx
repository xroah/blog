//original: https://github.com/feathericons/react-feather/blob/master/src/icons/home.js
import React from "react";
import Svg, { SvgIconProps } from "./svg";

export default function Home(props: SvgIconProps) {
    return (
        <Svg {...props}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </Svg>
    );
}