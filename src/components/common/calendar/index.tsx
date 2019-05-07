import * as React from "react";
import {
    IconButton,
    List,
    ListItem
} from "@material-ui/core";
import classnames from "classnames";
import {
    ChevronLeft,
    ChevronRight,
    FirstPage,
    LastPage
} from "@material-ui/icons";
import _fetch from "@common/fetch";
import { FETCH_CALENDAR } from "@common/api";
import "./index.scss";

let uuid = 0;

const FESTIVAL = {
    "1.1": "元旦节",
    "2.14": "情人节",
    "3.8": "妇女节",
    "3.12": "植树节",
    "4.1": "愚人节",
    "4.22": "地球日",
    "5.1": "劳动节",
    "5.4": "青年节",
    "5.12": "护士节",
    "6.1": "儿童节",
    "6.5": "环境日",
    "7.1": "建党节",
    "8.1": "建军节",
    "9.10": "教师节",
    "10.1": "国庆节",
    "12.1": "艾滋病日",
    "12.24": "平安夜",
    "12.25": "圣诞节"
};

export default class Calendar extends React.Component {

    state = {
        today: null,
        year: null,
        mon: null,
        days: null,
        info: null
    };

    constructor(props: any) {
        super(props);
        const date = new Date();
        this.state = {
            today: date,
            year: date.getFullYear(),
            mon: date.getMonth(),
            days: [],
            info: null
        };
    }

    componentWillMount() {
        let { year } = this.state;
        this.fetchCalendarInfo(year);
    }

    fetchCalendarInfo = async (year: number) => {
        const info = JSON.parse(localStorage.getItem(`${year}`));
        if (info) {
            return this.setState({
                info
            });
        }
        try {
            let ret = await fetch(`${FETCH_CALENDAR}${year}.json`);
            if (ret.ok) {
                let info = await ret.json();
                this.setState({
                    info
                });
                localStorage.setItem(`${year}`, JSON.stringify(info));
            } else {
                this.setState({
                    info: null
                });
            }
        } catch (error) {
            this.setState({
                info: null
            });
        }
    }

    isLeap(year: number) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    getMonthDays(year: number, mon: number) {
        let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let firstDay = new Date(`${year}/${mon + 1}/01`);
        let week = firstDay.getDay();
        if (mon === 1 && this.isLeap(year)) {
            monthDays[1] = 29;
        }
        let curDays = monthDays[mon];
        let days = [];
        let index = 0;
        for (let i = 1; i <= curDays; i++) {
            let _mon = mon + 1;
            let date = new Date(`${year}/${_mon}/${i}`);
            let obj = {
                year,
                mon,
                day: i,
                id: uuid++,
                fes: ""
            };
            if (_mon === 11) {
                if (date.getDay() === 4) {
                    index++;
                    if (index === 4) {
                        obj.fes = "感恩节";
                    }
                }
            } else if (_mon === 6) {
                if (date.getDay() === 0) {
                    index++;
                    if (index === 3) {
                        obj.fes = "父亲节";
                    }
                }
            } else if (_mon === 5) {
                if (date.getDay() === 0) {
                    index++;
                    if (index === 2) {
                        obj.fes = "母亲节";
                    }
                }
            }
            days.push(obj);
        }
        if (week !== 0) {
            for (let i = 1; i <= week; i++) {
                days.unshift(null)
            }
        }
        return days;
    }

    isToday = (date: Date) => {
        let { today } = this.state;
        return date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();
    }

    renderItem = () => {
        let {
            days,
            mon,
            info
        } = this.state;
        let ret = [];
        if (!days) return null;
        for (let i = 0, l = days.length; i < l; i += 7) {
            let cls = classnames("item-list", { "flex-end": i === 0 });
            ret.push(
                <List key={uuid++} className={cls}>
                    {
                        Array.from({ length: 7 }).map((item, index) => {
                            let tmp: any = days[i + index];
                            if (!tmp) return null;
                            let date = new Date(`${tmp.year}/${tmp.mon + 1}/${tmp.day}`);
                            let dayStr = `${tmp.mon + 1}.${tmp.day}`;
                            let fes = tmp.fes || FESTIVAL[dayStr] || "";
                            let dayInfo: any;
                            if (info && info[tmp.mon + 1]) {
                                dayInfo = info[tmp.mon + 1][tmp.day];
                            }
                            let cls = classnames(
                                "week-item",
                                {
                                    "other-mon": tmp.mon !== mon,
                                    "today": this.isToday(date)
                                },
                            );
                            fes = dayInfo ? (dayInfo.fes || fes) : fes;
                            return (
                                <ListItem key={tmp.id} className={cls}>
                                    <span>{tmp.day}</span>
                                    {
                                        fes && <span className="festival ellipsis" title={fes}>{fes}</span>
                                    }
                                    {dayInfo && <span className="status">{dayInfo.status}</span>}
                                </ListItem>
                            );
                        })
                    }
                </List>
            );
        }
        return ret;
    }

    changeDays = (year: number, mon: number) => {
        this.setState({
            days: this.getMonthDays(year, mon)
        });
    }

    componentDidMount() {
        let {
            year,
            mon
        } = this.state;
        this.changeDays(year, mon);
    }

    toPrevYear = () => {
        let {
            year,
            mon
        } = this.state;
        if (year === 1) return;
        year -= 1;
        this.setState({
            year
        });
        this.changeDays(year, mon);
        this.fetchCalendarInfo(year);
    }

    toNextYear = () => {
        let {
            year,
            mon
        } = this.state;
        year += 1;
        this.setState({
            year
        });
        this.changeDays(year, mon);
        this.fetchCalendarInfo(year);
    }

    toPrevMon = () => {
        let {
            year,
            mon
        } = this.state;
        if (mon === 0) {
            mon = 11;
            year -= 1;
            if (year === 0) return;
            this.fetchCalendarInfo(year);
        } else {
            mon -= 1;
        }
        this.setState({
            year,
            mon
        });
        this.changeDays(year, mon);
    }

    toNextMon = () => {
        let {
            year,
            mon
        } = this.state;
        if (mon === 11) {
            mon = 0;
            year += 1;
            this.fetchCalendarInfo(year);
        } else {
            mon += 1;
        }
        this.setState({
            year,
            mon
        });
        this.changeDays(year, mon);
    }

    toToday = () => {
        let { today } = this.state;
        let year = today.getFullYear();
        let mon = today.getMonth();
        this.setState({
            year,
            mon
        });
        this.changeDays(year, mon);
        this.fetchCalendarInfo(year);
    }

    render() {
        const WEEK_MAP = ["日", "一", "二", "三", "四", "五", "六"];
        let {
            year,
            mon
        } = this.state;

        return (
            <div className="calendar-wrapper">
                <div className="calendar-action">
                    <div className="prev">
                        <IconButton onClick={this.toPrevYear}>
                            <FirstPage />
                        </IconButton>
                        <IconButton onClick={this.toPrevMon}>
                            <ChevronLeft />
                        </IconButton>
                    </div>
                    <div className="current-info" onClick={this.toToday}>
                        <span>{year}年{mon + 1}月</span>
                    </div>
                    <div className="next">
                        <IconButton onClick={this.toNextMon}>
                            <ChevronRight />
                        </IconButton>
                        <IconButton onClick={this.toNextYear}>
                            <LastPage />
                        </IconButton>
                    </div>
                </div>
                <div className="week-list">
                    <List className="item-list">
                        {
                            WEEK_MAP.map(
                                week => <ListItem key={week} className="week-item">{week}</ListItem>
                            )
                        }
                    </List>
                    {this.renderItem()}
                </div>
            </div>
        );
    }
}