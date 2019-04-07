import * as React from "react";
import {IconButton} from "@material-ui/core";
import {Clear} from "@material-ui/icons";

interface Props {
    image: File;
}

export default class ImageItem extends React.Component<Props> {

    imgEl: React.RefObject<HTMLImageElement> = React.createRef();

    state = {
        name: "",
        from: ""
    };

    static getDerivedStateFromProps(props, state) {
        if (state.from === "state") {
            state.from = "";
            return state;
        }
        state.name = props.image.name;
        return state;
    }

    render() {
        let src;
        let {
            props: {image},
            state: {name}
        } = this;
        if (image) {
            src = URL.createObjectURL(image);
        }
        return (
            <div className="upload-image-item">
                <dl>
                    <dt className="img-wrapper">
                        <img ref={this.imgEl} src={src}/>
                    </dt>
                    <dd>
                        <input
                            type="text"
                            value={name}
                            className="form-control"/>
                    </dd>
                </dl>
                <IconButton
                    color="secondary"
                    className="del-image">
                    <Clear/>
                </IconButton>
            </div>
        );
    }

}