import * as React from "react";
import ClsList from "@containers/admin/cls-list";
import EditDialog from "@containers/admin/cls-dialog";
import "./index.scss";

export default class Classification extends React.Component {

    render() {
        return (
            <section>
                <ClsList />
                <EditDialog/>
            </section>
        );
    }
}