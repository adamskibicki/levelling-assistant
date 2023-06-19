import { useState } from "react";
import InputText from "../Inputs/InputText";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import ModalFooter from "../Modal/ModalFooter";
import ModalHeader from "../Modal/ModalHeader";
import "./AddUserCharacterModal.scss";
import { PostUserCharacterRequestData } from "./slice/thunks/postUserCharacter";

export default function AddUserCharacterModal(props: {
    name: string;
    title: string;
    show: boolean;
    modalTitle: string;
    onAccept: (userCharacter: PostUserCharacterRequestData) => void;
    onHide: (event: MouseEvent) => void;
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
    const defaultTitle = "Title";
    const defaultName = "Name Surname";

    const [title, setTitle] = useState(defaultTitle);
    const [name, setName] = useState(defaultName);

    const onAccept = (event: React.MouseEvent) => {
        event.preventDefault();
        props.onAccept({
            name: name,
            title: title,
        });
        reset();
    };

    const onClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        reset();
        props.onClose(event);
    };

    const onHide = (event: MouseEvent) => {
        reset();
        props.onHide(event);
    };

    const reset = () => {
        setTitle(defaultTitle);
        setName(defaultName);
    };

    return (
        <Modal show={props.show} onHide={onHide}>
            <ModalHeader onClose={onClose}>{props.modalTitle}</ModalHeader>
            <ModalContent>
                <InputText
                    className={"add-user-character-modal__input"}
                    label={"Name"}
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                />
                <InputText
                    label={"Title"}
                    value={title}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                />
            </ModalContent>
            <ModalFooter onClose={onClose} onAccept={onAccept}></ModalFooter>
        </Modal>
    );
}
