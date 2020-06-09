import React from "react";
import Container from "reap-ui/lib/Layout/Container";
import Alert from "reap-ui/lib/Alert";
import { hot } from "react-hot-loader/root";
import Header from "./header";

export default hot(
    () => (
        <Container>
            <Header/>
            <Alert variant="info">Hello world!</Alert>
        </Container>
    )
)