import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Children } from "react";
import "./ModalHeader.scss";

export default function ModalHeader(props: {
    onClose(event: React.MouseEvent<HTMLButtonElement>): void;
    children?: React.ReactNode | React.ReactNode[];
}) {
    return (
        <div className="modal-header">
            <div className="modal-header__content">
                {Children.toArray(props.children)}
            </div>
            <div>
                <button onClick={props.onClose}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
        </div>
    );
}