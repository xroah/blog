import React from "react";
import Container from "reap-ui/lib/Layout/Container";
import { NavLink } from "react-router-dom";

export default () => (
    <header className="bg-primary p-3 mb-3">
        <Container>
            <NavLink className="text-white" to="/">首页</NavLink>
            <NavLink className="text-white" to="/category">分类</NavLink>
        </Container>
    </header>
)