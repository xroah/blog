import React from "react";
import Container from "reap-ui/lib/Layout/Container";
import { NavLink } from "react-router-dom";
import { createUseStyles } from "react-jss";
import HomeIcon from "./icons/home";
import GridIcon from "./icons/grid";
import GithubIcon from "./icons/github";
import InfoIcon from "./icons/info";

const useStyles = createUseStyles({
    "vertical-text-bottom": {
        verticalAlign: "text-bottom"
    },
    "nav-link": {
        transition: "all .3s",
        padding: ".8rem 1.5rem",

        "&:hover": {
            textDecoration: "none",
            backgroundColor: "rgba(0, 0, 0, .15)"
        },
        "&.active": {
            backgroundColor: "rgba(0, 0, 0, .3)"
        }
    }
});

export default function Header() {
    const classes = useStyles();
    const links = [{
        to: "/",
        name: "首页",
        icon: <HomeIcon />
    }, /* {
        to: "/category",
        name: "分类",
        icon: <GridIcon />
    } */{
        to: "/about",
        name: "关于",
        icon: <InfoIcon/>
    }].map(l => (
        <NavLink
            key={l.to}
            to={l.to}
            exact
            className={`text-white ${classes["nav-link"]}`}>
            {
                React.cloneElement(
                    l.icon,
                    {
                        className: `mr-1 ${classes["vertical-text-bottom"]}`,
                        size: 16
                    }
                )
            }
        <span>{l.name}</span>
        </NavLink>
    ));

    return (
        <header className="bg-primary mb-3">
            <Container className="d-flex align-items-center">
                {links}
                {/* <a
                    href="https://github.com/xroah"
                    target="_blank"
                    className="ml-auto">
                    <GithubIcon color="#fff" />
                </a> */}
            </Container>
        </header>
    );
}