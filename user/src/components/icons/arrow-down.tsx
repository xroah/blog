//original: https://github.com/feathericons/react-feather/blob/master/src/icons/arrow-down.js
import React from "react"
import Svg, {SvgIconProps} from "./svg"

export default (props: SvgIconProps) => (
    <Svg {...props}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
    </Svg>
)