import { useEffect, useState } from "react";
import InputText from "../Inputs/InputText";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import ModalFooter from "../Modal/ModalFooter";
import ModalHeader from "../Modal/ModalHeader";
import "./BasicInfoEditModal.scss";
import { BasicInfo } from "../CharacterPanel/slice/state/BasicInfo";

export default function BasicInfoEditModal(props: {
    onAccept(basicInfo: BasicInfo): void;
    modalTitle: string;
    onClose(event: React.MouseEvent<HTMLButtonElement>): void;
    onHide(event: React.MouseEvent<HTMLButtonElement>): void;
    value: BasicInfo;
    show: boolean;
}) {
    const [title, setTitle] = useState("Title");
    const [name, setName] = useState("Name Surname");

    useEffect(() => {
        setTitle(props.value.title);
        setName(props.value.name);
    }, [props.value.title, props.value.name]);

    const onAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.onAccept({
            name: name,
            title: title,
        });
    };

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <ModalHeader onClose={props.onClose}>
                {props.modalTitle}
            </ModalHeader>
            <ModalContent>
                <InputText
                    className={"basic-info-edit-modal__input"}
                    label={"Name"}
                    value={name}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)}
                />
                <InputText
                    label={"Title"}
                    value={title}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)}
                />
            </ModalContent>
            <ModalFooter
                onClose={props.onClose}
                onAccept={onAccept}
            ></ModalFooter>
        </Modal>
    );
}
