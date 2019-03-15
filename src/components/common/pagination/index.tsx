import * as React from "react";
import {
    Button,
    List,
    ListItem
} from "@material-ui/core";
import classnames from "classnames";
import "./index.scss";

interface Props {
    total?: number;
    current?: number;
    onPageChange?: (arg: number) => any | void;
    pageSize?: number;
    hideOnSinglePage?: boolean;
}

export default class Pagination extends React.Component<Props> {

    state = {
        totalPages: 0,
        total: 0,
        current: 1
    };

    visiblePage = 7;

    static defaultProps = {
        total: 0,
        current: 1,
        pageSize: 10,
        hideOnSinglePage: true
    };

    componentDidMount() {
        let {
            total,
            pageSize
        } = this.props;
        let totalPages = Math.ceil(total / pageSize);
        this.setState({
            totalPages,
            total
        });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.total !== state.total) {
            let totalPages = Math.ceil(props.total / props.pageSize);
            let current = state.current;
            if (current > totalPages) {
                current = totalPages;
            }
            return {
                totalPages,
                current,
                total: props.total
            };
        }
        return state;
    }

    handleClick = (page: number) => {
        return (evt: React.MouseEvent) => this.go(page);
    }

    loop(start: number, end: number) {
        let ret = [];
        for (let i = start; i <= end; i++) {
            ret.push(this.getItem(i));
        }
        return ret;
    }

    getItem(key: number) {
        let { current } = this.state;
        let cls = classnames("pagination-btn", { active: current === key });
        return (
            <ListItem key={key}>
                <Button
                    onClick={this.handleClick(key)}
                    color="primary"
                    data-page={key}
                    disabled={current === key}
                    className={cls}>{key}</Button>
            </ListItem>
        );
    }

    genPages() {
        let {
            totalPages,
            current
        } = this.state;
        let max1 = Math.ceil(this.visiblePage / 2);
        let max2 = totalPages - max1;
        let ret = [];
        let first = this.getItem(1);
        let last = this.getItem(totalPages);
        let ellipsis1 = (
            <ListItem key="e1">
                <Button disabled className="pagination-ellipsis">...</Button>
            </ListItem>
        );
        let ellipsis2 = React.cloneElement(ellipsis1, { key: "e2" });
        if (totalPages <= this.visiblePage) {
            return this.loop(1, totalPages);
        }
        //show first ellipsis
        if (current >= max2 + 1) {
            ret.push(
                first,
                ellipsis1,
                ...this.loop(totalPages - (this.visiblePage - 1) + 1, totalPages)
            );
        } else if (current <= max1) {
            //show second ellipsis
            ret.push(
                ...this.loop(1, this.visiblePage - 1),
                ellipsis2,
                last
            );
        } else {
            //show both ellipsis
            ret.push(
                first,
                ellipsis1,
                ...this.loop(current - 2, current + 2),
                ellipsis2,
                last
            );
        }

        return ret;
    }

    triggerChange(page: number) {
        let { onPageChange } = this.props;
        if (typeof onPageChange === "function") {
            onPageChange(page);
        }
    }

    go(page: number) {
        this.setState({
            current: page
        });
        this.triggerChange(page);
    }

    goPrev = () => {
        this.go(this.state.current - 1)
    }

    goNext = () => {
        this.go(this.state.current + 1);
    }

    render() {
        let { hideOnSinglePage } = this.props;
        let {
            totalPages,
            current
        } = this.state;
        if (totalPages <= 1 && hideOnSinglePage) return null;
        return (
            <div className="pagination-wrapper">
                <List className="pagination">
                    <ListItem>
                        <Button
                            onClick={this.goPrev}
                            disabled={current === 1}
                            color="primary"
                            className="pagination-btn">上一页</Button>
                    </ListItem>
                    {this.genPages()}
                    <ListItem>
                        <Button
                            onClick={this.goNext}
                            disabled={current === totalPages}
                            color="primary"
                            className="pagination-btn">下一页</Button>
                    </ListItem>
                </List>
            </div>
        );
    }
}