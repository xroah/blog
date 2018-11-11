import * as React from "react"; 
import Button from '@material-ui/core/Button';
import "./index.scss";

export default class Nav extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        console.log(this.props)
        return (
            <div>
                nav
                <Button color="primary" variant="contained" classes={{
                    containedPrimary: "primary"
                }}>按钮</Button>
            </div>
        );
    }
}