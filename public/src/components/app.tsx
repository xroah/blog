import React from "react";
import Container from "reap-ui/lib/Layout/Container";
import { hot } from "react-hot-loader/root";
import Header from "./header";
import Routes from "./routes";


export default hot(
    () => (
        <>
            <Header />
            <Container>
                <Routes />
            </Container>
        </>
    )
)