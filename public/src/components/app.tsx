import React from "react";
import { Container, Alert } from "reap-ui";
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