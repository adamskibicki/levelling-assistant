import React, { Children } from "react";
import "./ModalContent.scss";

class ModalContent extends React.Component<{
    children: React.ReactNode | React.ReactNode[];
}> {
    render() {
        return (
            <div className="modal-content">
                {Children.toArray(this.props.children)}
            </div>
        );
    }
}

export default ModalContent;
