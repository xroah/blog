import React from "react";
import Container from "reap-ui/lib/Layout/Container";
import { NavLink } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    "nav-link": {
        transition: "all .3s",
        padding: ".8rem 1rem",

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
        name: "首页"
    }, {
        to: "/category",
        name: "分类"
    }].map(l => (
        <NavLink
            key={l.to}
            to={l.to}
            exact
            className={`text-white ${classes["nav-link"]}`}>
            {l.name}
        </NavLink>
    ));

    return (
        <header className="bg-primary mb-3">
            <Container className="d-flex">
                {links}
            </Container>
        </header>
    );
}