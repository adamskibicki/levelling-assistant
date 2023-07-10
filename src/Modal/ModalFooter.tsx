import React, { Children } from "react";
import "./ModalFooter.scss";

export default function ModalFooter(props: {
    onClose(event: React.MouseEvent<HTMLButtonElement>): void;
    onAccept(event: React.MouseEvent<HTMLButtonElement>): void;
    children?: React.ReactNode | React.ReactNode[];
}) {
    const onClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onClose && props.onClose(event);
    };

    const onAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onAccept && props.onAccept(event);
    };

    return (
        <div className="modal-footer">
            {Children.toArray(props.children)}
            <div>
                <button
                    className="modal-footer__accept"
                    onClick={onAccept}
                >
                    Accept
                </button>
                <button className="modal-footer__close" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}
