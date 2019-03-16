import * as React from "react";
import classnames from "classnames";

interface Props extends React.HTMLAttributes<any> {
    fetchCls?: () => any;
    list?: Array<any>;
    value?: string;
    onChange?: (arg: any) => any;
}

export default class ClsList extends React.Component<Props> {

    componentDidMount() {
        this.props.fetchCls();
    }

    handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        let { onChange } = this.props;
        if (typeof onChange === "function") {
            onChange(evt);
        }
    }

    render() {
        let {
            className,
            list,
            value,
            onChange,
            fetchCls,
            ...otherProps
        } = this.props;
        if (!list || !list.length) return null;
        return (
            <select
                value={value}
                onChange={this.handleChange}
                className={classnames("form-control", className)}
                {...otherProps}>
                <option value="">请选择</option>
                {
                    list.map(item => <option value={item._id} key={item._id}>{item.name}</option>)
                }
            </select>
        );
    }
}