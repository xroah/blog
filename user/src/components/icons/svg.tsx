//based on: https://github.com/feathericons/react-feather/blob/master/src/icons 
import React from "react";

export interface SvgIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
    color?: string;
    size?: number;
}

export default function Svg(props: SvgIconProps) {
    const {
        color = "currentColor",
        size = 24,
        ...rest
    } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest} />
    );
};