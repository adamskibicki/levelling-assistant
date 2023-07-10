import React, { Children } from "react";
import "./ModalContent.scss";

export default function ModalContent(props: {
    children: React.ReactNode | React.ReactNode[];
}) {
    return (
        <div className="modal-content">{Children.toArray(props.children)}</div>
    );
}
