import React from "react";
import Container from "reap-ui/lib/Layout/Container";
import {NavLink} from "react-router-dom";
import HomeIcon from "./icons/home";
import GridIcon from "./icons/grid";
import GithubIcon from "./icons/github";
import InfoIcon from "./icons/info";

export default function Header() {
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
        icon: <InfoIcon />
    }].map(l => (
        <NavLink
            key={l.to}
            to={l.to}
            exact
            className="text-white nav-link">
            {
                React.cloneElement(
                    l.icon,
                    {
                        className: "mr-1 vertical-text-bottom",
                        size: 16
                    }
                )
            }
            <span>{l.name}</span>
        </NavLink>
    ));

    return (
        <header className="bg-primary mb-3 header-nav">
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