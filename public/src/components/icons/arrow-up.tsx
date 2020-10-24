//original: https://github.com/feathericons/react-feather/blob/master/src/icons/arrow-up.js
import React from "react"
import Svg, {SvgIconProps} from "./svg"

export default (props: SvgIconProps) => (
    <Svg {...props}>
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
    </Svg>
)