import React, { Children, useEffect, useRef } from "react";
import "./Modal.scss";

interface ModalProps {
    show: boolean;
    onHide(event: MouseEvent): void;
    children: React.ReactNode | React.ReactNode[];
}

export default function Modal(props: ModalProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            props.show &&
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target as Node)
        ) {
            props.onHide(event);
        }
    };

    const visibilityClass = props.show ? "modal--show" : "modal--hide";

    return (
        <div className={"modal " + visibilityClass}>
            <div className="modal__content" ref={wrapperRef}>
                {props.show && Children.toArray(props.children)}
            </div>
        </div>
    );
}
