import { useState } from "react";
import InputText from "../Inputs/InputText";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import ModalFooter from "../Modal/ModalFooter";
import ModalHeader from "../Modal/ModalHeader";
import "./AddUserCharacterModal.scss";

export default function AddUserCharacterModal(props) {
    const defaultTitle = "Title";
    const defaultName = "Name Surname";

    const [title, setTitle] = useState(defaultTitle);
    const [name, setName] = useState(defaultName);

    const onAccept = (event) => {
        event.preventDefault();
        props.onAccept({
            name: name,
            title: title
        });
        reset();
    }

    const onClose = (event) => {
        reset();
        props.onClose(event);
    }

    const onHide = (event) => {
        reset();
        props.onHide(event);
    }

    const reset = () => {
        setTitle(defaultTitle);
        setName(defaultName);
    }

    return (
        <Modal show={props.show} onHide={onHide}>
            <ModalHeader onClose={onClose}>
                {props.modalTitle}
            </ModalHeader>
            <ModalContent>
                <InputText className={"add-user-character-modal__input"} label={'Name'} value={name} onChange={(event) => setName(event.target.value)}/>
                <InputText label={'Title'} value={title} onChange={(event) => setTitle(event.target.value)}/>
            </ModalContent>
            <ModalFooter onClose={onClose} onAccept={onAccept}>

            </ModalFooter>
        </Modal>
    )
} 