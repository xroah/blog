import * as React from "react";

interface Props {
    image?: any;
}

export default class Item extends React.Component<Props> {

    state = {
        isEdit: false,
        name: ""
    };

    render() {

        let {
            state: { isEdit },
            props: { image }
        } = this;
        let name = image.name || image.filename;
        return (
            <div className="image-item">
                <dl>
                    <dt className="image-wrapper">
                        <img src={image.relPath} />
                    </dt>
                    <dd className="ellipsis">
                        {
                            isEdit ?
                                <input type="text" className="form-control" /> :
                                <span title={name}>{name}</span>
                        }
                    </dd>
                </dl>
            </div>
        );
    }

}