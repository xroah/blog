import React from "react";
import Container from "reap-ui/lib/Layout/Container";
import Header from "./header";
import Routes from "./routes";
import RightBottom from "../containers/right-bottom";
// import Feedback from "../containers/feedback";

export default () => (
    <>
        <Header />
        <Container>
            <Routes />
        </Container>
        <RightBottom />
        {/* <Feedback /> */}
    </>
)