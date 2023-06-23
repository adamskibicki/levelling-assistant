import React, { Children } from "react";
import ModalContent from "./ModalContent";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import Modal from "./Modal";

export interface CommonModalProps {
    show: boolean;
    title: string;
    onHide(event: MouseEvent): void;
    children: React.ReactNode | React.ReactNode[];
    onClose(event: React.MouseEvent<HTMLButtonElement>): void;
    onAccept(event: React.MouseEvent<HTMLButtonElement>): void;
    additionalElements?: React.ReactNode | React.ReactNode[];
}

export default function CommonModal(props: CommonModalProps) {
    return (
        <Modal onHide={props.onHide} show={props.show}>
            <ModalHeader onClose={props.onClose}>{props.title}</ModalHeader>
            <ModalContent>{Children.toArray(props.children)}</ModalContent>
            <ModalFooter
                onClose={props.onClose}
                onAccept={props.onAccept}
            ></ModalFooter>
            {Children.toArray(props.additionalElements)}
        </Modal>
    );
}